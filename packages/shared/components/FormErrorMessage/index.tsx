import React, { useEffect } from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Props = {
  message: string;
};

const FormErrorMessage: React.FC<Props> = ({ message }) => {
  useEffect(() => {
    if (!message) {
      return;
    }

    window.scrollTo(0, 0);
  }, [message]);

  return message ? (
    <Container>
      <Text>{message}</Text>
    </Container>
  ) : null;
};

const Container = styled.div`
  padding: 1rem 1.5rem;
  margin: 0 0 3rem 0;
  position: relative;

  &:before {
    background-color: ${({ theme }) => theme.keyColor.error};
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    content: '';
    border-radius: 0.2rem;
  }
`;

const Text = styled.div`
  ${typo.Body};
  position: relative;
  color: ${({ theme }) => theme.keyColor.error};
  line-height: 1.4;
  font-weight: bold;
`;

export default FormErrorMessage;
