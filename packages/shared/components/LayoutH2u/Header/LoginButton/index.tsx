import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import { useLocale } from '../../../../context/LocaleContext';
import { useLoginStateContext } from '../../../../context/LoginStateContext';
import typo from '../../../../styles/typo';

interface Props {
  options: Config;
}

const LoginButton: React.FC<Props> = ({ options }) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { locale, lang } = useLocale();

  return isLoadedUserInfo && !userInfo.isLoggedIn ? (
    <Link href={`${options.ACCOUNT}/${locale}/login`} passHref>
      <Container>
        <div>{lang.account.menus.login}</div>
      </Container>
    </Link>
  ) : null;
};

const Container = styled.a`
  ${typo.Body}
  position: absolute;
  top: 0;
  right: 3.5rem;
  bottom: 0;
  height: 2.5rem;
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
