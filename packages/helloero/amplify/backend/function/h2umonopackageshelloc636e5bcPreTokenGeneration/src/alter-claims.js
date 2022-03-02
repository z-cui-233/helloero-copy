/**
 * @type {import('@types/aws-lambda').PreTokenGenerationTriggerHandler}
 */
exports.handler = async (event) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        userid: event.request.userAttributes['custom:userid'],
      },
      claimsToSuppress: [],
    },
  };
  // Return to Amazon Cognito
  return event;
};
