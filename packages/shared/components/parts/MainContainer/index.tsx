import React from 'react';
import styled from 'styled-components';

type Size = 'normal' | 'large';

interface Props {
  size?: Size;
  children: React.ReactNode;
}

const MainContainer: React.VFC<Props> = ({ size = 'normal', children }) => {
  return <Container size={size}>{children}</Container>;
};

const Container = styled.div<{ size: Size }>`
  max-width: ${({ size }) => (size === 'normal' ? '640px' : '840px')};
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

export default MainContainer;
