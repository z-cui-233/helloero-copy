import React from 'react';
import styled from 'styled-components';

type Size = 'normal' | 'large';

type Props = {
  size?: Size;
  children: React.ReactNode;
};

const MainContainer: React.VFC<Props> = ({ size = 'normal', children }) => (
  <Container size={size}>{children}</Container>
);

const Container = styled.div<{ size: Size }>`
  max-width: ${({ size }) => (size === 'normal' ? '40rem' : '46rem')};
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

export default MainContainer;
