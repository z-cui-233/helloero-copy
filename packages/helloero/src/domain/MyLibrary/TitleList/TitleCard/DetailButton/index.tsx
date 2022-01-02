import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';

type Props = {
  onClick: () => void;
};

const DetailButton: React.FC<Props> = ({ onClick }) => {
  const { lang } = useLocale();

  return (
    <Container onClick={onClick}>
      <div>{lang.helloero.myLibrary.purchased.detail}</div>
    </Container>
  );
};

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