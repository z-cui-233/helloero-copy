import React from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import nookies from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/shared/styles/globalStyle';
import GlobalHead from 'src/shared/components/GlobalHead';
import theme from 'src/shared/styles/theme';
import GlobalScripts from 'src/shared/components/GlobalScripts';
import { LoginStateContextProvider } from 'src/shared/context/LoginStateContext';
import Amplify, { I18n } from 'aws-amplify';
import config from '../aws-exports';
import { vocabularies } from 'src/shared/assets/i18n/amplify/vocabularies';
import 'src/shared/assets/css/amplify.css';
import 'src/shared/assets/css/prettify.css';
import { cookieParams } from 'src/shared/constants/cookies';

Amplify.configure({
  ...config,
  ssr: true,
});
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

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

  if (appContext.ctx.req && appContext.ctx.res) {
    // set uuid for GetPlayInfoQuery
    const cookies = nookies.get(appContext.ctx);
    if (!cookies[cookieParams.uuid.name]) {
      nookies.set(appContext.ctx, cookieParams.uuid.name, uuidv4(), {
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
