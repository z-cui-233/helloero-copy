import React from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Config } from 'u-next/config';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withLayout = <P extends Record<string, any>>(
  WrappedComponent: React.FC<P>,
  options: Config
): React.FC<P> => {
  const ComponentWithLayout: React.FC<P> = (props) => {
    return (
      <Container>
        <Header options={options} />
        <Main>
          <WrappedComponent {...props} />
        </Main>
        <Footer />
      </Container>
    );
  };

  return ComponentWithLayout;
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
  padding: 4.5rem 0 0;
  background-color: ${({ theme }) => theme.background.primary};
`;

export default withLayout;
