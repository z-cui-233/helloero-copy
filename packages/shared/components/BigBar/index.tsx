import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Size = 'normal' | 'large';

interface Props {
  size?: Size;
  title: string;
}

const BigBar: React.FC<Props> = ({ size = 'normal', title }) => {
  return (
    <Container>
      <Contents size={size}>
        <Title>{title}</Title>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color3};
  padding: 3rem 0;
  width: 100%;
`;

const Contents = styled.div<{ size: Size }>`
  margin: 0 auto;
  width: calc(100% - 2rem);
  max-width: ${({ size }) => (size === 'normal' ? '640px' : '840px')};
`;

const Title = styled.h1`
  ${typo.Heading2};
`;

export default BigBar;
