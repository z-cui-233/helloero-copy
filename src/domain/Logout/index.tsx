import { Auth, Hub } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import withLayout from 'src/shared/components/Layout';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import ButtonStandard from 'src/shared/components/Form/ButtonStandard';

const Logout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    // なぜかログアウト画面に直リンしてくる不思議さん
    if (!userInfo.isLoggedIn) {
      location.replace('/');
      return;
    }

    setIsInitialized(true);
  }, [isLoadedUserInfo, userInfo.isLoggedIn]);

  const handleClickLogout = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    try {
      await Auth.signOut();
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: 'signedout',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(true);
      location.replace('/');
    }
  };

  return (
    <Container>
      {isInitialized && (
        <React.Fragment>
          <Title>HELLOERO からログアウトしますか？</Title>
          <Text>再度ログインするには、ログインIDとパスワードが必要です。</Text>
          <ButtonSection>
            <ButtonStandard
              onClick={() => {
                handleClickLogout();
              }}
              label={'ログアウト'}
            />
            <Link href="/my-library" passHref>
              <StyledLink>キャンセル</StyledLink>
            </Link>
          </ButtonSection>
        </React.Fragment>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.text.standard};
  text-decoration: underline;
  display: inline-block;
  margin: 1.5rem auto 0;
`;

export default withLayout(Logout);
