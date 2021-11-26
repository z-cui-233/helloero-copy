// eslint-disable-next-line
const axios = require('axios');
axios.defaults.baseURL = process.env.WABIT_URL;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const mapWabikenResponse = (wabikenRespone) => {
  const { wabiken, result } = wabikenRespone;
  const { token, content } = wabiken;

  return {
    result,
    wabiken: {
      ...wabiken,
      id: token,
      content: {
        ...content,
        id: content.key.id,
      },
    },
  };
};

/* 
## correspoinding VDL response mapper should be: 
## Raise a GraphQL field error in case of a datasource invocation error
#if($ctx.result.errorInfo)
  $util.error($ctx.result.errorMessage, $ctx.result.errorType, null, $context.result.errorInfo)
#end

$util.toJson($context.result)
*/
const mapWabitErrorResponse = (response) => ({
  errorMessage: response.data.error.message,
  errorType: `${response.status}`,
  errorInfo: response.data.error,
});

const getPlayinfo = async (event) => {
  const { token, deviceCode, lock, deviceId } = event.arguments;
  const response = await axios.get(
    `/v1/playinfo/${token}?device_id=${deviceId}&device_code=${deviceCode}&lock=${lock}`
  );

  if (response.data.error) {
    return mapWabitErrorResponse(response);
  }

  const { result, playinfo } = response.data;

  return {
    result,
    playinfo: {
      ...playinfo,
      endpoints: playinfo.endpoints.map(({ endpoint }) => ({
        ...endpoint,
        isem: {
          version: endpoint.isem.version,
          endpoint: endpoint.isem.endpoint,
          isemToken: endpoint.isem.header['U-Isem-Token'],
        },
      })),
    },
  };
};

const activateWabiken = async (event) => {
  const { token, lockTo } = event.arguments;
  const response = await axios.put(`/v1/wabiken/${token}`, {
    locked_to: lockTo, // TBD: use context.identity.cognitoIdentityId insted??
  });

  if (response.data.error) {
    return mapWabitErrorResponse(response);
  }

  return mapWabikenResponse(response.data);
};

const getWabikenMeta = async (event) => {
  const { id } = event.arguments;

  const response = await axios.get(`/v1/wabiken/${id}`);

  if (response.data.error) {
    return mapWabitErrorResponse(response);
  }

  return mapWabikenResponse(response.data);
};

const resolvers = {
  Query: {
    getWabikenMeta: (event) => {
      return getWabikenMeta(event);
    },
    getPlayinfo: (event) => {
      return getPlayinfo(event);
    },
  },
  Mutation: {
    activateWabiken: (event) => {
      return activateWabiken(event);
    },
  },
};

exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error('Resolver not found.');
};
