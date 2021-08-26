import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return <Container>Header</Container>;
};

const Container = styled.header`
  height: 6rem;
  width: 100%;
  background-color: #3f72af;
  color: #fff;
`;

export default Header;
