import { Router } from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import Footer from './Footer';
import Header from './Header';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type Props = {
  children: React.ReactNode;
  options: Config;
  needLogin?: boolean;
};

const LayoutH2u: React.VFC<Props> = ({
  children,
  options,
  needLogin = true,
}) => (
  <Container>
    <Header options={options} needLogin={needLogin} />
    <Main>{children}</Main>
    <Footer options={options} />
  </Container>
);

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
  padding: 0 0 5rem;
  background-color: ${({ theme }) => theme.background.primary};
`;

export default LayoutH2u;
