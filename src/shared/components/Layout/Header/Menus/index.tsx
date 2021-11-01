import React, { useEffect, useState } from 'react';
import device from 'src/shared/styles/device';
import styled, { keyframes, css } from 'styled-components';
import LogoMark from './LogoMark';
import MenuList from './MenuList';

interface Props {
  isDisplayedMenu: boolean;
}

const Menus: React.FC<Props> = ({ isDisplayedMenu }) => {
  const [haveNeverShow, setHaveNeverShow] = useState<boolean>(true);

  useEffect(() => {
    if (!isDisplayedMenu) {
      return;
    }

    setHaveNeverShow(false);
  }, [isDisplayedMenu]);

  return (
    <Container haveNeverShow={haveNeverShow} isDisplayedMenu={isDisplayedMenu}>
      <Grid>
        <LogoContainer>
          <LogoMark />
        </LogoContainer>
        <MenuContainer>
          <MenuList />
        </MenuContainer>
      </Grid>
    </Container>
  );
};

const showingSubMenu = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }

  to {
    opacity: 1;
    visibility: visible;
  }
`;

const closingSubMenu = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const Container = styled.div<{
  isDisplayedMenu: boolean;
  haveNeverShow: boolean;
}>`
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background.primary};
  z-index: 100;

  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
  padding: 1rem;

  ${({ isDisplayedMenu, haveNeverShow }) =>
    isDisplayedMenu
      ? css`
          animation: ${showingSubMenu} 0.3s ease-out forwards;
        `
      : haveNeverShow
      ? ``
      : css`
          animation: ${closingSubMenu} 0.3s ease-out forwards;
        `};
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;

  @media ${device.ltSd} {
    display: flex;
    flex-direction: column-reverse;
    padding: 1rem;
    max-width: 30rem;
    margin: 0 auto;
  }
`;

const LogoContainer = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;

  @media ${device.ltSd} {
    aspect-ratio: 2 / 1;
  }
`;

const MenuContainer = styled.div`
  max-width: 35rem;
  width: 100%;

  @media ${device.ltSd} {
    padding: 0;
    max-width: 100%;
  }
`;

export default Menus;
