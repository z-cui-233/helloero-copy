import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import typo from '../../../../shared/styles/typo';
import ValidateMessage from '../../../../shared/components/parts/ValidateMessage';

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
    <div>
      <Container>
        <Input {...fieldOptions} />
        <Label>{label}</Label>
      </Container>
      {validateMessage && <ValidateMessage message={validateMessage} />}
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.label`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.tertiary};
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
  background-color: ${({ theme }) => theme.background.primary};
  border: 2px solid
    ${({ theme, isError = false }) =>
      isError ? theme.keyColor.color5 : theme.foreground.secondary};
  box-shadow: none;
  color: ${({ theme }) => theme.foreground.primary};
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

export default TextField;
