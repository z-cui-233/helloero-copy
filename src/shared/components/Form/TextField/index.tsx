import React, { InputHTMLAttributes } from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

interface Props {
  label: string;
  validateMessage?: string | undefined;
  fieldOptions: CustomInputProps;
}

const TextField: React.FC<Props> = ({
  label,
  validateMessage,
  fieldOptions,
}) => {
  return (
    <React.Fragment>
      <Container>
        <Input {...fieldOptions} />
        <Label>{label}</Label>
      </Container>
      {validateMessage && <ValidateMessage>{validateMessage}</ValidateMessage>}
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.label`
  ${typo.Standard};
  color: ${({ theme }) => theme.text.secondary};
  pointer-events: none;
  padding: 0 0.5rem;
  transition: all 0.1s ease;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  height: 1rem;
  line-height: 1;
  transform: translate(0, 0) scale(1);
`;

const Input = styled.input<CustomInputProps>`
  ${typo.Standard};
  border-radius: 0.25rem;
  appearance: none;
  background-color: ${({ theme }) => theme.input.background};
  border: 2px solid
    ${({ theme, isError = false }) =>
      isError ? theme.input.warning : theme.input.border};
  box-shadow: none;
  color: ${({ theme }) => theme.text.standard};
  padding: 1rem 0.5rem 0;
  height: 3.5rem;
  width: 100%;

  &:focus + ${Label} {
    ${typo.Note};
    transform: translate(0, -0.75rem);
    opacity: 0.9;
  }

  &:not([value='']) + ${Label} {
    ${typo.Note};
    transform: translate(0, -0.75rem);
    opacity: 0.9;
  }

  &::placeholder {
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }

  &:focus::placeholder {
    opacity: 1;
  }
`;

const ValidateMessage = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.input.warning};
  margin: 0.5rem 0 0;
  line-height: 1.4;
  font-weight: bold;
`;

export default TextField;
