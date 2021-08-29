import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import React from 'react';
import withLayout from 'src/shared/components/Layout';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const Logout: React.FC = () => {
  const router = useRouter();

  const handleClickLogout = async (): Promise<void> => {
    try {
      await Auth.signOut();
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: 'signedout',
      });
      router.replace('/');
    } catch (error) {
      router.replace('/');
    }
  };

  return (
    <Container>
      <Title>ログアウトしますか</Title>
      <Contents>
        <button
          onClick={() => {
            handleClickLogout();
          }}
        >
          はい
        </button>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 3rem auto 0;
  width: calc(100% - 2rem);
  background-color: #dbe2ef;
  padding: 1rem;
`;

const Title = styled.div`
  ${typo.Heading3};
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.4;
`;

const Contents = styled.div`
  margin: 2rem 0 0;
`;

export default withLayout(Logout);
