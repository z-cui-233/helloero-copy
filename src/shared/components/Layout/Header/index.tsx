import React, { useState } from 'react';
import styled from 'styled-components';
import HamburgerButton from './HamburgerButton';
import Menus from './Menus';
import SiteLogo from './SiteLogo';

const Header: React.FC = () => {
  const [isDisplayedMenu, setIsDisplayedMenu] = useState<boolean>(false);

  const handleClickHamburger = (): void => {
    setIsDisplayedMenu(!isDisplayedMenu);
  };

  return (
    <Container>
      <HeaderContents>
        <SiteLogo />
        <HamburgerButton
          isDisplayedMenu={isDisplayedMenu}
          onClick={handleClickHamburger}
        />
        <Menus isDisplayedMenu={isDisplayedMenu} />
      </HeaderContents>
    </Container>
  );
};

const Container = styled.header`
  background-color: ${({ theme }) => theme.background.primary};
  position: fixed;
  top: 0;
  left: 1rem;
  right: 1rem;
  height: 5rem;
  z-index: 100;
`;

const HeaderContents = styled.div`
  background-color: ${({ theme }) => theme.background.standard};
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  height: 4rem;
`;

export default Header;
