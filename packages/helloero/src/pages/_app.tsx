import React from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import nookies from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/shared/styles/globalStyle';
import GlobalHead from '@/shared/components/GlobalHead';
import theme from '@/shared/styles/theme';
import GlobalScripts from '@/shared/components/GlobalScripts';
import { LoginStateContextProvider } from '@/shared/context/LoginStateContext';
import Amplify, { I18n } from 'aws-amplify';
import config from '../aws-exports';
import { vocabularies } from '@/shared/i18n/amplify/vocabularies';
import '@/localShared/assets/css/amplify.css';
import { cookieParams } from '@/shared/constants/cookies';
import { IntlProvider } from 'react-intl';
import { i18n_messages } from '@/localShared/constants/babystar';
import { globalConfig } from '../globalConfig';
import { LocaleProvider } from '@/shared/context/LocaleContext';

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
    <IntlProvider locale="ja-JP" messages={i18n_messages}>
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
