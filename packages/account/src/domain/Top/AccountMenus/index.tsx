import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';

const AccountMenus: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo ? (
    <Container>
      <Title>アカウント設定</Title>
      <div>
        {!userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={`/login`} passHref>
                <StyledLink>
                  ログインすると利用できます。
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
          </React.Fragment>
        )}
        {userInfo.isLoggedIn && (
          <React.Fragment>
            <div>
              <Link href={'/update-email'} passHref>
                <StyledLink>
                  メールアドレスの変更
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={'/reset-password'} passHref>
                <StyledLink>
                  パスワードの変更
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </div>
            <div>
              <Link href={'/logout'} passHref>
                <StyledLink>
                  ログアウト
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
