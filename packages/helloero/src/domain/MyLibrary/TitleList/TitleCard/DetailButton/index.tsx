import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';

type Props = {
  onClick: () => void;
};

const DetailButton: React.FC<Props> = ({ onClick }) => (
  <Container onClick={onClick}>
    <div>詳細を見る</div>
  </Container>
);

const Container = styled.div`
  ${typo.Standard};
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.keyColor.color1};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  transition: color 0.2s ease-out;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};
  }
`;

export default DetailButton;
