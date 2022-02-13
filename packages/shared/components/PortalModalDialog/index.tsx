import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Props = {
  title: string;
  body: React.ReactNode;
  cancelText?: string;
  onClickCancel?: (e: unknown) => unknown;
  cancelSubmit?: string;
  onClickSubmit?: (e: unknown) => unknown;
  cancelWarning?: string;
  onClickWarning?: (e: unknown) => unknown;
};

const PortalModalDialog: React.FC<Props> = ({
  title,
  body,
  cancelText = '',
  onClickCancel,
  cancelSubmit = '',
  onClickSubmit,
  cancelWarning = '',
  onClickWarning,
}) => (
  <Container>
    <Title>{title}</Title>
    <Text>{body}</Text>
    <Buttons>
      {onClickCancel && (
        <CancelButton type="button" onClick={onClickCancel}>
          {cancelText}
        </CancelButton>
      )}
      {onClickSubmit && (
        <Button type="button" onClick={onClickSubmit}>
          {cancelSubmit}
        </Button>
      )}
      {onClickWarning && (
        <WarningButton type="button" onClick={onClickWarning}>
          {cancelWarning}
        </WarningButton>
      )}
    </Buttons>
  </Container>
);

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 30rem;
  width: calc(100% - 1rem);
  background-color: ${({ theme }) => theme.background.primary};
  padding: 1.5rem;
`;

const Title = styled.div`
  ${typo.Lead1};
  color: ${({ theme }) => theme.foreground.primary};
`;

const Text = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 1rem 0 0;
`;

const Buttons = styled.div`
  margin: 2rem 0 0;
  display: flex;
  justify-content: flex-end;

  & > :not(:first-child) {
    margin: 0 0 0 0.5rem;
  }
`;

const Button = styled.button`
  ${typo.Standard};
  appearance: none;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  border: none;
  border-radius: 0.2rem;
  box-shadow: none;
  display: inline-block;
  color: ${({ theme }) => theme.foreground.primaryInverted};
  cursor: pointer;
  font-weight: bold;
  min-width: 6rem;
  line-height: 1.2;
  padding: 0.75rem 1rem;
  text-align: center;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.foreground.quaternary};
`;

const WarningButton = styled(Button)`
  background-color: ${({ theme }) => theme.keyColor.color1};
`;

export default PortalModalDialog;
