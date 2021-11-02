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
        <GridContainer>
          <LogoMark />
        </GridContainer>
        <GridContainer>
          <MenuList />
        </GridContainer>
      </Grid>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }

  to {
    opacity: 1;
    visibility: visible;
  }
`;

const fadeOut = keyframes`
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

  animation: ${({ isDisplayedMenu, haveNeverShow }) =>
    isDisplayedMenu
      ? css`
          ${fadeIn} 0.3s ease-out forwards
        `
      : haveNeverShow
      ? `none`
      : css`
          ${fadeOut} 0.3s ease-out forwards
        `};
`;

const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  @media ${device.ltSd} {
    flex-direction: column-reverse;
    flex-wrap: wrap;
    height: auto;
  }
`;

const GridContainer = styled.div`
  width: 50%;

  @media ${device.ltSd} {
    width: 100%;
  }
`;

export default Menus;
