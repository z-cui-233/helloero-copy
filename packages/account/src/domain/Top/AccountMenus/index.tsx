import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';
import ArrowTextLink from '@/shared/components/ArrowTextLink';

const MENUS = [
  {
    href: '/update-email',
    text: 'メールアドレスの変更',
  },
  {
    href: '/reset-password',
    text: 'パスワードの変更',
  },
  {
    href: '/logout',
    text: 'ログアウト',
  },
] as const;

const AccountMenus: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo && userInfo.isLoggedIn ? (
    <Container>
      <Title>アカウント設定</Title>
      <Menus>
        {MENUS.map(({ href, text }) => (
          <MenusItem key={href}>
            <Link href={href} passHref>
              <StyledLink>
                {text}
                <ListRightArrow />
              </StyledLink>
            </Link>
          </MenusItem>
        ))}
      </Menus>
      <DeletionLink>
        <ArrowTextLink href="/account-deletion" text="アカウントの削除" />
      </DeletionLink>
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
  border-bottom: 1px solid ${({ theme }) => theme.background.quinary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.quinary};
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
  margin: 1rem 0 0;
  padding: 0 1rem 0 0;
  text-align: right;
`;

export default AccountMenus;
