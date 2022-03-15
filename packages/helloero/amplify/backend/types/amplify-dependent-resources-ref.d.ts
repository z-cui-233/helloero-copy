export type AmplifyDependentResourcesAttributes = {
  auth: {
    h2umonopackageshelloc636e5bc: {
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      UserPoolId: 'string';
      UserPoolArn: 'string';
      UserPoolName: 'string';
      AppClientIDWeb: 'string';
      AppClientID: 'string';
      CreatedSNSRole: 'string';
    };
  };
  function: {
    helloeroApiLambdaResolver: {
      Name: 'string';
      Arn: 'string';
      Region: 'string';
      LambdaExecutionRole: 'string';
    };
    h2umonopackageshelloc636e5bcPostConfirmation: {
      Name: 'string';
      Arn: 'string';
      LambdaExecutionRole: 'string';
      Region: 'string';
    };
    h2umonopackageshelloc636e5bcPreTokenGeneration: {
      Name: 'string';
      Arn: 'string';
      LambdaExecutionRole: 'string';
      Region: 'string';
    };
  };
  api: {
    helloeroApi: {
      GraphQLAPIIdOutput: 'string';
      GraphQLAPIEndpointOutput: 'string';
    };
  };
};
