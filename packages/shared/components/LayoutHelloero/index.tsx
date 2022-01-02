import React from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { Config } from 'u-next/config';
import Footer from './Footer';
import Header from './Header';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type Props = {
  children: React.ReactNode;
  options: Config;
};

const LayoutHelloero: React.VFC<Props> = ({ children, options }) => {
  return (
    <Container>
      <Header options={options} />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: ${({ theme }) => theme.keyColor.color1};
  padding: 0 0.5rem;
`;

const Main = styled.div`
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 4.5rem 0;
  background-color: ${({ theme }) => theme.background.primary};
`;

export default LayoutHelloero;
