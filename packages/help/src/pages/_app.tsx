import React from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Amplify, { Auth } from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import theme from '@/shared/styles/theme';
import GlobalStyle from '@/shared/styles/globalStyle';
import GlobalHead from '@/shared/components/GlobalHead';
import { LoginStateContextProvider } from '@/shared/context/LoginStateContext';
import GlobalScripts from '@/shared/components/GlobalScripts';
import config from '../aws-exports';

Amplify.configure({
  ...config,
  ssr: true,
  Auth: {
    cookieStorage: {
      domain: globalConfig.COOKIE_DOMAIN,
      path: '/',
      expires: 365,
      sameSite: 'lax',
      secure: true,
    },
  },
  API: {
    graphql_headers: async () => {
      const session = await Auth.currentSession();
      return {
        Authorization: session.getIdToken().getJwtToken(),
      };
    },
  },
});

const CoreApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalHead />
      <LoginStateContextProvider>
        <Component {...pageProps} />
        <div id="modal" />
      </LoginStateContextProvider>
      <GlobalScripts />
    </ThemeProvider>
  );
};

CoreApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps> => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default CoreApp;
