import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/shared/styles/globalStyle';
import GlobalHead from 'src/shared/components/GlobalHead';
import theme from 'src/shared/styles/theme';
import GlobalScripts from 'src/shared/components/GlobalScripts';

const CoreApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalHead />
      <Component {...pageProps} />
      <GlobalScripts />
    </ThemeProvider>
  );
};

export default CoreApp;
