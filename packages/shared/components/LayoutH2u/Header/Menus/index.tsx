import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import { useLocale } from '../../../../context/LocaleContext';
import { useLoginStateContext } from '../../../../context/LoginStateContext';
import device from '../../../../styles/device';
import typo from '../../../../styles/typo';

interface Props {
  isDisplayedMenu: boolean;
  options: Config;
}

const Menus: React.FC<Props> = ({ isDisplayedMenu, options }) => {
  const { lang, locale } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <Container isDisplayedMenu={isDisplayedMenu}>
      <MenuList>
        {isLoadedUserInfo && !userInfo.isLoggedIn && (
          <MenuItem>
            <Link href={`${options.ACCOUNT}/${locale}/login`} passHref>
              <StyledLink>{lang.account.menus.login}</StyledLink>
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link href={`${options.HELLOERO}/${locale}`} passHref>
            <StyledLink>{lang.account.menus.helloero}</StyledLink>
          </Link>
        </MenuItem>
        {isLoadedUserInfo && userInfo.isLoggedIn && (
          <MenuItem>
            <Link href={`${options.ACCOUNT}/${locale}`} passHref>
              <StyledLink>{lang.account.menus.account}</StyledLink>
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link href={`${options.HELP}/${locale}`} passHref>
            <StyledLink>{lang.account.menus.help}</StyledLink>
          </Link>
        </MenuItem>
        {isLoadedUserInfo && userInfo.isLoggedIn && (
          <MenuItem>
            <Link href={`${options.ACCOUNT}/${locale}/logout`} passHref>
              <StyledLink>{lang.account.menus.logout}</StyledLink>
            </Link>
          </MenuItem>
        )}
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
    left: 0rem;
    top: 0rem;
    right: 0rem;
  }
`;

const MenuList = styled.ul`
  margin: 4.5rem 0 0;
  border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 0 1rem 1rem;

  @media ${device.mobile} {
    margin: 5rem 0 0;
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
