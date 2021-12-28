import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import typo from '../../../styles/typo';
import ValidateMessage from '../../../components/parts/ValidateMessage';
import VisibilityIcon from '../../../assets/icon/visibility_black_24dp.svg';
import VisibilityOffIcon from '../../../assets/icon/visibility_off_black_24dp.svg';

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
  const isPassword = fieldOptions.type === 'password';
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);

  return (
    <div>
      <Container>
        <Input
          {...fieldOptions}
          type={isPassword && isRevealPassword ? 'text' : fieldOptions.type}
        />
        <Label>{label}</Label>
        {isPassword && (
          <PasswordReveal
            onClick={() => {
              setIsRevealPassword(!isRevealPassword);
            }}
          >
            {isRevealPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </PasswordReveal>
        )}
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
  color: ${({ theme }) => theme.foreground.secondary};
  background-color: ${({ theme }) => theme.background.primary};
  pointer-events: none;
  padding: 0 0.5rem;
  transition: all 0.1s ease;
  top: 0;
  bottom: 0;
  left: 0.5rem;
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
  padding: 0.5rem 1rem;
  height: 3.5rem;
  width: 100%;
  outline: none;

  &:focus + ${Label} {
    ${typo.Note};
    transform: translate(0, -1.65rem);
    font-weight: bold;
  }

  &:not([value='']) + ${Label} {
    ${typo.Note};
    transform: translate(0, -1.65rem);
    font-weight: bold;
  }

  &::placeholder {
    ${typo.Body};
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }

  &:focus::placeholder {
    opacity: 1;
  }
`;

const PasswordReveal = styled.div`
  position: absolute;
  right: 1rem;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 1.5rem;
  opacity: 0.8;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default TextField;
