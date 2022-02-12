import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

type Props = {
  label: string;
  fieldOptions: CustomInputProps;
};

const FormCheckBox: React.FC<Props> = ({ fieldOptions, label }) => (
  <Container>
    <Check type="checkbox" {...fieldOptions} />
    <Mark isError={fieldOptions.isError ?? false} />
    <Text>{label}</Text>
  </Container>
);

const Container = styled.label`
  display: inline-block;
  padding: 0 1rem 0 2rem;
  position: relative;
  cursor: pointer;
  line-height: 1.4;
`;

const Mark = styled.div<{ isError: boolean }>`
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 1.25rem;
  height: 1.25rem;
  background-color: transparent;
  border: 2px solid
    ${({ theme, isError = false }) =>
      isError ? theme.keyColor.error : theme.foreground.primary};

  &:after {
    content: '';
    display: none;
    position: absolute;
    width: 0.25rem;
    height: 0.5rem;
    border: 2px solid ${({ theme }) => theme.foreground.primaryInverted};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    top: 0.125rem;
    left: 0.35rem;
  }
`;

const Check = styled.input`
  appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border: 1px solid red;
  box-shadow: none;
  outline: none;
  padding: 0;
  margin: 0;
  display: none;

  &:checked + ${Mark} {
    background-color: ${({ theme }) => theme.foreground.primary};

    &:after {
      display: block;
    }
  }
`;

const Text = styled.span`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
`;

export default React.memo(FormCheckBox);
