import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLocale } from '../../../../context/LocaleContext';
import { useLoginStateContext } from '../../../../context/LoginStateContext';
import typo from '../../../../styles/typo';

const LoginButton: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { locale, lang } = useLocale();

  return isLoadedUserInfo && userInfo.isLoggedIn ? null : (
    <Link href={`/${locale}/login`} passHref>
      <Container>
        <div>{lang.account.menus.login}</div>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  ${typo.Body}
  position: absolute;
  top: 0;
  right: 0.5rem;
  bottom: 0;
  height: 3rem;
  z-index: 1000;
  margin: auto 0;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export default LoginButton;
