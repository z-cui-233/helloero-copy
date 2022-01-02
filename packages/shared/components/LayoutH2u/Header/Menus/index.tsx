import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import { useLocale } from '../../../../context/LocaleContext';
import device from '../../../../styles/device';
import typo from '../../../../styles/typo';

type Props = {
  isDisplayedMenu: boolean;
  options: Config;
};

const Menus: React.FC<Props> = ({ isDisplayedMenu, options }) => {
  const { lang } = useLocale();

  return (
    <Container isDisplayedMenu={isDisplayedMenu}>
      <MenuList>
        <MenuItem>
          <Link href={`${options.HELLOERO}/`} passHref>
            <StyledLink>{lang.account.menus.helloero}</StyledLink>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={`${options.ACCOUNT}/`} passHref>
            <StyledLink>{lang.account.menus.account}</StyledLink>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={`${options.HELP}/`} passHref>
            <StyledLink>{lang.account.menus.help}</StyledLink>
          </Link>
        </MenuItem>
      </MenuList>
    </Container>
  );
};

const Container = styled.nav<{ isDisplayedMenu: boolean }>`
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  min-width: 300px;
  background-color: ${({ theme }) => theme.background.primary};
  z-index: 1001;
  box-shadow: 0px 4px 24px 0px ${({ theme }) => theme.background.quaternary};

  opacity: ${({ isDisplayedMenu }) => (isDisplayedMenu ? 1 : 0)};
  visibility: ${({ isDisplayedMenu }) =>
    isDisplayedMenu ? 'visible' : 'hidden'};

  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media ${device.mobile} {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

const MenuList = styled.ul`
  margin: 4rem 0 0;
  border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 0 1rem 1rem;

  @media ${device.mobile} {
    margin: 4.5rem 0 0;
  }
`;

const MenuItem = styled.li`
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
  display: block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  transition: background-color 0.1s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

export default Menus;
