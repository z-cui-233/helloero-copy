import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/shared/styles/globalStyle';
import GlobalHead from 'src/shared/components/GlobalHead';
import theme from 'src/shared/styles/theme';
import GlobalScripts from 'src/shared/components/GlobalScripts';
import { Provider } from 'next-auth/client';
// import { UserInfoContextProvider } from 'src/shared/context/UserInfoContext';
// import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
// import Amplify, { Auth, I18n } from 'aws-amplify';
// import awsConfig from 'src/awsConfig';
// import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
// import { AuthState } from '@aws-amplify/ui-components';
// import { vocabularies } from 'src/shared/assets/i18n/amplify/vocabularies';

// Amplify.configure(awsConfig);
// Auth.configure(awsConfig);

// I18n.putVocabularies(vocabularies);
// I18n.setLanguage('ja');

const CoreApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // console.log(AuthState);

  return (
    <ThemeProvider theme={theme}>
      {/* <AmplifyAuthenticator> */}
      {/* <UserInfoContextProvider> */}
      <GlobalStyle />
      <GlobalHead />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
      {/* <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: 'username' },
            { type: 'password' },
            { type: 'email' },
          ]}
        /> */}
      <GlobalScripts />
      {/* </UserInfoContextProvider> */}
      {/* </AmplifyAuthenticator> */}
    </ThemeProvider>
  );
};

export default CoreApp;
