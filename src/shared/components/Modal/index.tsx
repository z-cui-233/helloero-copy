import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  onClickClose: (e: unknown) => unknown;
}

const Modal: React.FC<Props> = ({ children, onClickClose }) => {
  return (
    <Container>
      <ModalContainer>
        <ModalContents>{children}</ModalContents>
        <CloseButton onClick={onClickClose} />
      </ModalContainer>
    </Container>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.filter.primary};
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease;
  overflow: scroll;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  padding: 1rem;
  max-width: calc(800px - 2rem);
  position: relative;
  overflow: hidden;
`;

const ModalContents = styled.div`
  background-color: ${({ theme }) => theme.background.standard};
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  content: '';
  display: block;
  background-color: ${({ theme }) => theme.menuButton.background.default};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.menuButton.background.hover};
  }

  &:before {
    height: 2px;
    width: 1.5rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.menuButton.icon.default};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(45deg);
  }

  &:after {
    height: 2px;
    width: 1.5rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.menuButton.icon.default};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(-45deg);
  }
`;

export default Modal;
