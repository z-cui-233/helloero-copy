// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CognitoIdentityServiceProvider, config, DynamoDB } = require('aws-sdk');

config.update({ region: 'ap-northeast-1' });
const ddb = new DynamoDB();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const cognitoServiceProvider = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });
  try {
    let userid = event.request.userAttributes['custom:userid'];
    if (!userid) {
      userid = uuidv4();
      await cognitoServiceProvider
        .adminUpdateUserAttributes({
          UserAttributes: [
            {
              Name: 'custom:userid',
              Value: userid,
            },
          ],
          UserPoolId: event.userPoolId,
          Username: event.userName,
        })
        .promise();
    }
    const date = new Date();
    const params = {
      Item: {
        id: { S: event.userName },
        __typename: { S: 'User' },
        owner: { S: userid },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
      },
      TableName: process.env.USER_TABLE,
    };
    await ddb.putItem(params).promise();
  } catch (e) {
    console.log(`Failed post-confirmation with error: ${e.message}`);
    throw new Error('Post-confirmation failed');
  }
};
