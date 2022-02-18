import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Props = {
  label: string;
  fieldOptions: InputHTMLAttributes<HTMLInputElement>;
};

const FormRadioBox: React.FC<Props> = ({ fieldOptions, label }) => (
  <Container>
    <Radio type="radio" {...fieldOptions} />
    <Mark />
    <Text>{label}</Text>
  </Container>
);

const Container = styled.label`
  display: inline-block;
  padding: 0 1rem 0 1.5rem;
  position: relative;
  cursor: pointer;
`;

const Mark = styled.div`
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
  border: 2px solid ${({ theme }) => theme.foreground.tertiary};
  border-radius: 50%;

  &:after {
    content: '';
    display: none;
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background-color: ${({ theme }) => theme.foreground.secondary};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
  }
`;

const Radio = styled.input`
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
    &:after {
      display: block;
    }
  }
`;

const Text = styled.span`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
`;

export default React.memo(FormRadioBox);
