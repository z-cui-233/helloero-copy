import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import withLayout from 'src/shared/components/Layout';
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      const backPath = router.query.backpath
        ? (router.query.backpath as string)
        : '';

      router.replace(backPath ? decodeURIComponent(backPath) : '/my-library');
      return;
    }

    setIsInitialized(true);
  }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

  return isInitialized ? (
    <Container>
      <AmplifyAuthContainer>
        <AmplifyAuthenticator>
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              { type: 'username' },
              { type: 'password' },
              { type: 'email' },
            ]}
          />
        </AmplifyAuthenticator>
      </AmplifyAuthContainer>
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0 0;
  position: relative;
`;

export default withLayout(Login);
