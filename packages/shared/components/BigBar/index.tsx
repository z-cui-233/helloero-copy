import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Size = 'normal' | 'large';

type Props = {
  size?: Size;
  title: string;
  subText?: string;
};

const BigBar: React.FC<Props> = ({ size = 'normal', title, subText }) => {
  return (
    <Container>
      <Contents size={size}>
        <Title>{title}</Title>
        {subText && <SubText>{subText}</SubText>}
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 3rem 0;
  width: 100%;
`;

const Contents = styled.div<{ size: Size }>`
  margin: 0 auto;
  width: calc(100% - 2rem);
  max-width: ${({ size }) => (size === 'normal' ? '640px' : '840px')};
`;

const Title = styled.h1`
  ${typo.Heading3};
`;

const SubText = styled.div`
  ${typo.Standard};
  margin: 0.5rem 0 0;
  color: ${({ theme }) => theme.foreground.secondary};
`;

export default BigBar;
