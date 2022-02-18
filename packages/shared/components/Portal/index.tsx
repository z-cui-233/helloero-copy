import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

const Portal: React.VFC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <React.Fragment>
          <BackGroundFilter />
          <Container>{children}</Container>
        </React.Fragment>,
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

const BackGroundFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.foreground.secondary};
  animation: ${fadeIn} 0.3s ease;
  z-index: 1000;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease;
  z-index: 1001;
`;

export default Portal;
