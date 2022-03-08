import React from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import nookies from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import Amplify, { Auth } from 'aws-amplify';
import { IntlProvider } from 'react-intl';
import GlobalStyle from '@/shared/styles/globalStyle';
import GlobalHead from '@/shared/components/GlobalHead';
import theme from '@/shared/styles/theme';
import GlobalScripts from '@/shared/components/GlobalScripts';
import { LoginStateContextProvider } from '@/shared/context/LoginStateContext';
import { cookieParams } from '@/shared/constants/cookies';
import { i18n_messages } from '@/localShared/constants/babystar';
import { globalConfig } from '../globalConfig';
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
    <IntlProvider locale="ja-JP" messages={i18n_messages}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalHead />
        <LoginStateContextProvider>
          <Component {...pageProps} />
          <div id="modal" />
        </LoginStateContextProvider>
        <GlobalScripts />
      </ThemeProvider>
    </IntlProvider>
  );
};

CoreApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps> => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.req && appContext.ctx.res) {
    // set uuid for GetPlayInfoQuery
    const cookies = nookies.get(appContext.ctx);
    if (!cookies[cookieParams.uuid.name]) {
      nookies.set(appContext.ctx, cookieParams.uuid.name, uuidv4(), {
        domain: globalConfig.COOKIE_DOMAIN,
        path: cookieParams.uuid.path,
        expires: cookieParams.uuid.expires(),
        httpOnly: cookieParams.uuid.httpOnly,
        secure: cookieParams.uuid.secure,
      });
    }
  }

  return {
    ...appProps,
  };
};

export default CoreApp;
