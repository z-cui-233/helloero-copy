import React from 'react';
import styled, { keyframes } from 'styled-components';

const SkeltonCard: React.FC = () => <Container />;

const flash = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.4;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color3};
  aspect-ratio: 5 / 7;
  width: 100%;
  animation: ${flash} 1s linear infinite;

  &:nth-child(1) {
    animation-delay: 0;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
  &:nth-child(6) {
    animation-delay: 0.5s;
  }
  &:nth-child(7) {
    animation-delay: 0.6s;
  }
  &:nth-child(8) {
    animation-delay: 0.7s;
  }
`;

export default SkeltonCard;
