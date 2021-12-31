import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';

const SiteMenus: React.FC = () => {
  const { locale, lang } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo ? (
    <Container>
      <Title>{lang.account.top.menus.title}</Title>
      <List>
        {!userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/${locale}/login`} passHref>
                <StyledLink>
                  {lang.account.top.menus.login}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <div>
                <Link href={`${globalConfig.HELP}/`} passHref>
                  <StyledLink>
                    {lang.account.top.menus.help}
                    <ListRightArrow />
                  </StyledLink>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
        {userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/${locale}/update-email`} passHref>
                <StyledLink>
                  {lang.account.top.menus.updateEmail}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/reset-password`} passHref>
                <StyledLink>
                  {lang.account.top.menus.resetPassword}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`${globalConfig.HELP}/`} passHref>
                <StyledLink>
                  {lang.account.top.menus.help}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/logout`} passHref>
                <StyledLink>
                  {lang.account.top.menus.logout}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
          </React.Fragment>
        )}
      </List>
    </Container>
  ) : null;
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

export default SiteMenus;
