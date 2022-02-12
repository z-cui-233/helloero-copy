import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';
import ArrowTextLink from '@/shared/components/ArrowTextLink';

const AccountMenus: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo ? (
    <Container>
      <Title>アカウント設定</Title>
      <div>
        {!userInfo.isLoggedIn && (
          <Menus>
            <MenusItem>
              <Link href="/login" passHref>
                <StyledLink>
                  ログインすると利用できます
                  <ListRightArrow />
                </StyledLink>
              </Link>
            </MenusItem>
          </Menus>
        )}
        {userInfo.isLoggedIn && (
          <React.Fragment>
            <Menus>
              <MenusItem>
                <Link href="/update-email" passHref>
                  <StyledLink>
                    メールアドレスの変更
                    <ListRightArrow />
                  </StyledLink>
                </Link>
              </MenusItem>
              <MenusItem>
                <Link href="/reset-password" passHref>
                  <StyledLink>
                    パスワードの変更
                    <ListRightArrow />
                  </StyledLink>
                </Link>
              </MenusItem>
              <MenusItem>
                <Link href="/logout" passHref>
                  <StyledLink>
                    ログアウト
                    <ListRightArrow />
                  </StyledLink>
                </Link>
              </MenusItem>
            </Menus>
            <DeletionLink>
              <ArrowTextLink href="/account-deletion" text="アカウントの削除" />
            </DeletionLink>
          </React.Fragment>
        )}
      </div>
    </Container>
  ) : null;
};

const Container = styled.div`
  margin: 3rem 0 0;
`;

const Title = styled.div`
  ${typo.Lead1};
  padding: 0 0 0 1rem;
`;

const Menus = styled.div`
  margin: 1rem 0 0;
`;

const MenusItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

const StyledLink = styled.a`
  padding: 1rem 2.5rem 1rem 1rem;
  display: block;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const DeletionLink = styled.div`
  margin: 2rem 0 0;
  padding: 0 1rem 0 0;
  text-align: right;
`;

export default AccountMenus;
