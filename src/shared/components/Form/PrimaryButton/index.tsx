import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  onClick: (e: unknown) => unknown;
  label: string;
}

const PrimaryButton: React.FC<Props> = ({ onClick, label }) => {
  return (
    <Container>
      <Button onClick={onClick} tabIndex={0}>
        {label}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0 0;
`;

const Button = styled.button`
  ${typo.Standard};
  font-weight: bold;
  cursor: pointer;
  outline: none;
  appearance: none;
  border: none;
  border-radius: 0.25rem;
  display: block;
  line-height: 1.4;
  padding: 1rem 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.button.background.default};
  color: ${({ theme }) => theme.button.text.default};
  transition: color 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.button.background.hover};
    color: ${({ theme }) => theme.button.text.hover};
  }
`;

export default PrimaryButton;
