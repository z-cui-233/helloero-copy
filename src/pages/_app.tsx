import React from 'react';
import { AppProps } from 'next/app';
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
      </LoginStateContextProvider>
      <GlobalScripts />
    </ThemeProvider>
  );
};

export default CoreApp;
