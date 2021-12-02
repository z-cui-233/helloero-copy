import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  message: string;
}

const ValidateMessage: React.FC<Props> = ({ message }) => {
  return <Container>{message}</Container>;
};

const Container = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.keyColor.color5};
  margin: 0.5rem 0 0;
  line-height: 1.4;
  font-weight: bold;
`;

export default ValidateMessage;
