import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/shared/styles/globalStyle';
import GlobalHead from 'src/shared/components/GlobalHead';
import theme from 'src/shared/styles/theme';
import GlobalScripts from 'src/shared/components/GlobalScripts';
import { Provider } from 'next-auth/client';
import { UserInfoContextProvider } from 'src/shared/context/UserInfoContext';

const CoreApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalHead />
      <Provider session={pageProps.session}>
        <UserInfoContextProvider>
          <Component {...pageProps} />
        </UserInfoContextProvider>
      </Provider>
      <GlobalScripts />
    </ThemeProvider>
  );
};

export default CoreApp;
