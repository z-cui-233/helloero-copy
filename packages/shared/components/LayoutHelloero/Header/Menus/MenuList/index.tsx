import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import typo from '../../../../../styles/typo';
import ArrowLogo from '../../../../../assets/icon/arrow_right_white.svg';
import { useLoginStateContext } from '../../../../../context/LoginStateContext';
import device from '../../../../../styles/device';
import { useLocale } from '../../../../../context/LocaleContext';
import { Config } from 'u-next/config';

interface Props {
  options: Config;
}

const MenuList: React.FC<Props> = ({ options }) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { locale, lang } = useLocale();
  const backUrl = encodeURIComponent(`${options.HELLOERO}/${locale}`);

  return (
    <Container>
      <React.Fragment>
        <Title>{lang.helloero.menus.settings}</Title>
        <List>
          <li>
            {isLoadedUserInfo && !userInfo.isLoggedIn && (
              <Link
                href={`${options.ACCOUNT}/${locale}/login?back=${backUrl}`}
                passHref
              >
                <StyledLink>
                  {lang.helloero.menus.login}
                  <StyledArrowLogo />
                </StyledLink>
              </Link>
            )}
            {isLoadedUserInfo && userInfo.isLoggedIn && (
              <React.Fragment>
                <Link href={`${options.ACCOUNT}/${locale}`} passHref>
                  <StyledLink>
                    {lang.helloero.menus.account}
                    <StyledArrowLogo />
                  </StyledLink>
                </Link>
                <Link href={`${options.ACCOUNT}/${locale}/logout`} passHref>
                  <StyledLink>
                    {lang.helloero.menus.logout}
                    <StyledArrowLogo />
                  </StyledLink>
                </Link>
              </React.Fragment>
            )}
          </li>
        </List>
      </React.Fragment>
      <Title>{lang.helloero.menus.help}</Title>
      <List>
        <li>
          <StyledLink
            href="https://video.unext.jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {lang.helloero.menus.terms}
            <StyledArrowLogo />
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="https://video.unext.jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {lang.helloero.menus.support}
            <StyledArrowLogo />
          </StyledLink>
        </li>
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding: 4rem 2rem 0;
  max-width: 800px;

  @media ${device.ltSd} {
    max-width: 100%;
  }
`;

const Title = styled.div`
  ${typo.Heading1};
  margin: 4rem 0 0;
  color: ${({ theme }) => theme.foreground.primaryInverted};
`;

const List = styled.ul`
  margin: 1rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Heading2};
  font-weight: bold;
  color: ${({ theme }) => theme.foreground.primaryInverted};
  position: relative;
  display: block;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;

  & svg path {
    transition: fill 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};
    text-decoration: underline;

    & svg path {
      fill: ${({ theme }) => theme.foreground.primary};
    }
  }
`;

const StyledArrowLogo = styled(ArrowLogo)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
    height: auto;
    width: 1.5rem;
    display: block;
  }
`;

export default MenuList;
