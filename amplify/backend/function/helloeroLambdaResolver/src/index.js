/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
axios.defaults.baseURL = process.env.WABIT_URL;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const {
  mapWabitErrorResponse,
  mapWabikenResponse,
  mapPlayInfo,
} = require('./converters/index.js');

const getPlayInfo = async (event) => {
  const { token, deviceCode, lock, deviceId } = event.arguments;
  const response = await axios.get(
    `/v2/playinfo/${token}?device_id=${deviceId}&device_code=${deviceCode}&lock=${lock}`
  );

  if (response.data.error) {
    return mapWabitErrorResponse(response);
  }

  const { result, playinfo } = response.data;

  return {
    result,
    playInfo: mapPlayInfo(playinfo),
  };
};

const activateWabiken = async (event) => {
  const { token, lockTo } = event.arguments;
  const response = await axios.put(`/v2/wabiken/${token}`, {
    locked_to: lockTo, // TBD: use context.identity.cognitoIdentityId instead??
  });

  if (response.data.error) {
    return mapWabitErrorResponse(response);
  }

  return mapWabikenResponse(response.data);
};

const getWabikenMeta = async (event) => {
  const { id } = event.arguments;

  const response = await axios.get(`/v2/wabiken/${id}`);

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
    getPlayInfo: (event) => {
      return getPlayInfo(event);
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
