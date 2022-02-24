// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CognitoIdentityServiceProvider, config } = require('aws-sdk');

config.update({ region: 'ap-northeast-1' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const cognitoServiceProvider = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });
  if (!event.request.userAttributes['custom:userid']) {
    try {
      await cognitoServiceProvider
        .adminUpdateUserAttributes({
          UserAttributes: [
            {
              Name: 'custom:userid',
              Value: uuidv4(),
            },
          ],
          UserPoolId: event.userPoolId,
          Username: event.userName,
        })
        .promise();
      console.log('Succeeded creating userid');
    } catch (e) {
      console.log(`Failed creating userid with error: ${e.message}`);
      throw new Error('Post-confirmation: failed creating userid');
    }
  }
};
