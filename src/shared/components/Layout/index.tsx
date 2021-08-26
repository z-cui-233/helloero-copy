import React from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Header from './Header';
import Footer from './Footer';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const withLayout = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>
): React.FC<P> => {
  const ComponentWithLayout: React.FC<P> = (props) => {
    return (
      <Container>
        <Header />
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
`;

const Main = styled.div`
  flex: 1 1 auto;
  padding: 0 0 8rem;
  position: relative;
  width: 100%;
`;

export default withLayout;
