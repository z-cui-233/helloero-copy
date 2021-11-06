import React from 'react';
import styled from 'styled-components';

const MainContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 640px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

export default MainContainer;
