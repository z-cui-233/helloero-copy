import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';
import ArrowLogo from '@/shared/assets/icon/arrow_right.svg';

const SiteMenus: React.FC = () => {
  const { locale } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <Container>
      <Title>アカウント設定</Title>
      {!isLoadedUserInfo && <div />}
      {isLoadedUserInfo && userInfo.isLoggedIn && (
        <List>
          <div>
            <Link href={`/${locale}/update-email`} passHref>
              <StyledLink>
                メールアドレスの変更
                <Arrow>
                  <ArrowLogo />
                </Arrow>
              </StyledLink>
            </Link>
          </div>
          <div>
            <Link href={`/${locale}/reset-password`} passHref>
              <StyledLink>
                パスワードの変更
                <Arrow>
                  <ArrowLogo />
                </Arrow>
              </StyledLink>
            </Link>
          </div>
        </List>
      )}
      {isLoadedUserInfo && !userInfo.isLoggedIn && (
        <List>
          <div>すべてのメニューを利用するにはログインが必要です</div>
          <Link href={`/${locale}/login`} passHref>
            <a>ログイン</a>
          </Link>
        </List>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0 0;
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 1.5rem 0 0 1.5rem;
`;

const Title = styled.div`
  ${typo.Heading3};
`;

const List = styled.div`
  margin: 1.5rem 0 0;
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
