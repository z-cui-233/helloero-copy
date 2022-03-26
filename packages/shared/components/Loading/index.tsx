import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading: React.FC = () => (
  <Container>
    <Spinner />
  </Container>
);

const Container = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 8rem auto;
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.foreground.secondary};
  animation: ${spin} 0.6s ease-in-out infinite;
`;

export default Loading;
