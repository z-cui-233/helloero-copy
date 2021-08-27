const awsConfig = {
  Auth: {
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITYPOOLID,
    region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOLID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USERPOOLWEBCLIENTID,
    // oauth: {
    //   domain: 'helloero.auth.ap-northeast-1.amazoncognito.com',
    //   scope: ['email', 'openid'],
    //   redirectSignIn: 'http://localhost:3000/',
    //   redirectSignOut: 'http://localhost:3000/',
    //   responseType: 'code',
    // },

    // cookieStorage: {
    //   domain: 'localhost',
    //   path: '/',
    //   expires: 365,
    //   sameSite: 'lax',
    //   secure: true,
    // },
  },
};

export default awsConfig;
