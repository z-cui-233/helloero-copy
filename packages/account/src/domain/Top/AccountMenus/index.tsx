import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';

const AccountMenus: React.FC = () => {
  const { locale, lang } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo ? (
    <Container>
      <Title>{lang.account.top.accountMenus.title}</Title>
      <div>
        {!userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/${locale}/login`} passHref>
                <StyledLink>
                  {lang.account.top.accountMenus.login}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
          </React.Fragment>
        )}
        {userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/${locale}/update-email`} passHref>
                <StyledLink>
                  {lang.account.top.accountMenus.updateEmail}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/reset-password`} passHref>
                <StyledLink>
                  {lang.account.top.accountMenus.resetPassword}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/logout`} passHref>
                <StyledLink>
                  {lang.account.top.accountMenus.logout}
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </Container>
  ) : null;
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  margin: 3rem 0 0;
  border-radius: 0.2rem;
`;

const Title = styled.div`
  ${typo.Heading3};
  padding: 1.5rem 1rem;
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

export default AccountMenus;
