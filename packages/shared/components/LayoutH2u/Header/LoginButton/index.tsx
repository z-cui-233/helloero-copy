import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import { useLoginStateContext } from '../../../../context/LoginStateContext';
import typo from '../../../../styles/typo';

type Props = {
  options: Config;
};

const LoginButton: React.FC<Props> = ({ options }) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo && !userInfo.isLoggedIn ? (
    <Link href={`${options.ACCOUNT}/login`} passHref>
      <Container>
        <div>ログイン</div>
      </Container>
    </Link>
  ) : null;
};

const Container = styled.a`
  ${typo.Body}
  position: absolute;
  top: 0;
  right: 1rem;
  bottom: 0;
  height: 2.5rem;
  z-index: 1000;
  margin: auto 0;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  border-radius: 0.2rem;
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
