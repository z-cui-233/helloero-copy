import React from 'react';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import LogoMark from './LogoMark';
import MenuList from './MenuList';

interface Props {
  isDisplayedMenu: boolean;
}

const Menus: React.FC<Props> = ({ isDisplayedMenu }) => {
  return (
    <Container isDisplayedMenu={isDisplayedMenu}>
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

const Container = styled.div<{ isDisplayedMenu: boolean }>`
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background.primary};
  z-index: 100;

  visibility: ${({ isDisplayedMenu }) =>
    isDisplayedMenu ? 'visible' : 'hidden'};
  opacity: ${({ isDisplayedMenu }) => (isDisplayedMenu ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
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