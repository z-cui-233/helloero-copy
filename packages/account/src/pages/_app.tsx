import React from 'react';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Amplify, { I18n } from 'aws-amplify';
import '../styles/globals.css';
import config from '../aws-exports';
import { globalConfig } from 'src/globalConfig';
import { vocabularies } from '@/shared/assets/i18n/amplify/vocabularies';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '@/shared/styles/theme';
import GlobalStyle from '@/shared/styles/globalStyle';
import GlobalHead from '@/shared/components/GlobalHead';
import { LocaleProvider } from '@/shared/context/LocaleContext';
import { LoginStateContextProvider } from '@/shared/context/LoginStateContext';
import GlobalScripts from '@/shared/components/GlobalScripts';
import '@/localShared/assets/css/amplify.css';

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
});
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

const CoreApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <GlobalStyle />
        <GlobalHead />
        <LoginStateContextProvider>
          <Component {...pageProps} />
          <div id="modal" />
        </LoginStateContextProvider>
        <GlobalScripts />
      </LocaleProvider>
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
