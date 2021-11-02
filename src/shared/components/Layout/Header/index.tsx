import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../../assets/logo/ColorBlack.svg';
import HamburgerButton from './HamburgerButton';
import device from 'src/shared/styles/device';
import Menus from './Menus';

const Header: React.FC = () => {
  const [isDisplayedMenu, setIsDisplayedMenu] = useState<boolean>(false);

  const handleClickHamburger = (): void => {
    setIsDisplayedMenu(!isDisplayedMenu);
  };

  return (
    <Container>
      <Link href="/" passHref>
        <a>
          <StyledLogo />
        </a>
      </Link>
      <HamburgerButton
        isDisplayedMenu={isDisplayedMenu}
        onClick={handleClickHamburger}
      />
      <Menus isDisplayedMenu={isDisplayedMenu} />
    </Container>
  );
};

const Container = styled.header`
  height: 4rem;
  width: 100%;
  position: relative;
`;

const StyledLogo = styled(Logo)`
  &&& {
    position: absolute;
    top: 0.75rem;
    left: 0;
    right: 0;
    bottom: 0.75rem;
    margin: auto;
    height: 2.5rem;
    width: auto;
    display: block;

    @media ${device.ltSd} {
      right: auto;
      left: 1rem;
    }
  }
`;

export default Header;
