import React, { useState } from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import HamburgerButton from './HamburgerButton';
import LoginButton from './LoginButton';
import Menus from './Menus';
import SiteLogo from './SiteLogo';

interface Props {
  options: Config;
}

const Header: React.FC<Props> = ({ options }) => {
  const [isDisplayedMenu, setIsDisplayedMenu] = useState<boolean>(false);

  const handleClickHamburger = (): void => {
    setIsDisplayedMenu(!isDisplayedMenu);
  };

  return (
    <Container>
      <HeaderContents>
        <SiteLogo options={options} />
        <LoginButton options={options} />
        <HamburgerButton
          isDisplayedMenu={isDisplayedMenu}
          onClick={handleClickHamburger}
        />
        <Menus isDisplayedMenu={isDisplayedMenu} options={options} />
      </HeaderContents>
    </Container>
  );
};

const Container = styled.header`
  background-color: ${({ theme }) => theme.keyColor.color1};
  position: fixed;
  top: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 4.5rem;
  z-index: 100;
`;

const HeaderContents = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0;
  height: 4rem;
`;

export default Header;
