import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

interface Props {
  onClickClose: (e: unknown) => unknown;
}

const PortalModal: React.FC<Props> = ({ children, onClickClose }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <Container>
          <ModalContainer>
            {children}
            <CloseButton onClick={onClickClose} />
          </ModalContainer>
        </Container>,
        document.getElementById('modal') as Element
      )
    : null;
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
  background-color: ${({ theme }) => theme.foreground.secondary};
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease;
  overflow: scroll;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  max-width: 800px;
  position: relative;
  overflow: hidden;
  width: calc(100% - 1rem);
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  content: '';
  display: block;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.keyColor.color1};
  }

  &:before {
    height: 2px;
    width: 1.5rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.background.primary};

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
    background-color: ${({ theme }) => theme.background.primary};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(-45deg);
  }
`;

export default PortalModal;
