import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Props = {
  message: string;
};

const FormValidateMessage: React.FC<Props> = ({ message }) => (
  <Container>{message}</Container>
);

const Container = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.keyColor.color5};
  margin: 0.5rem 0 0;
  line-height: 1.4;
  font-weight: bold;
`;

export default FormValidateMessage;
