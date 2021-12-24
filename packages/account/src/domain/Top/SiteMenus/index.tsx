import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ArrowLogo from '@/shared/assets/icon/arrow_right.svg';
import { globalConfig } from 'src/globalConfig';

const SiteMenus: React.FC = () => {
  const { locale, lang } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <Container>
      <Title>{lang.account.top.menus.title}</Title>
      {!isLoadedUserInfo && <div />}
      <List>
        {isLoadedUserInfo && userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/${locale}/update-email`} passHref>
                <StyledLink>
                  {lang.account.top.menus.updateEmail}
                  <Arrow>
                    <ArrowLogo />
                  </Arrow>
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/reset-password`} passHref>
                <StyledLink>
                  {lang.account.top.menus.resetPassword}
                  <Arrow>
                    <ArrowLogo />
                  </Arrow>
                </StyledLink>
              </Link>
            </div>
          </React.Fragment>
        )}
        {isLoadedUserInfo && !userInfo.isLoggedIn && (
          <div>
            <Link href={`/${locale}/login`} passHref>
              <StyledLink>
                {lang.account.top.menus.login}
                <Arrow>
                  <ArrowLogo />
                </Arrow>
              </StyledLink>
            </Link>
          </div>
        )}
        <div>
          <Link href={`${globalConfig.HELP}/${locale}`} passHref>
            <StyledLink>
              {lang.account.top.menus.help}
              <Arrow>
                <ArrowLogo />
              </Arrow>
            </StyledLink>
          </Link>
        </div>
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0 0;
  border: 1px solid ${({ theme }) => theme.background.tertiary};
`;

const Title = styled.div`
  ${typo.Heading3};
  margin: 1.5rem 1.5rem 0;
`;

const List = styled.div`
  margin: 1.5rem 0 0 1.5rem;
`;

const StyledLink = styled.a`
  border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 1rem 2.5rem 1rem 1rem;
  display: block;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  margin: auto 0;
`;

export default SiteMenus;
