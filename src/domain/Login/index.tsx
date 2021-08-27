import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import withLayout from 'src/shared/components/Layout';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';

const Login: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo.isLoggedIn) {
      return;
    }

    const backUrl = (router.query.backurl as string) ?? '';
    if (backUrl) {
      router.replace(backUrl);
      return;
    }

    router.replace('/my-library');
  }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

  return userInfo.isLoggedIn ? (
    <div />
  ) : (
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
  );
};

export default withLayout(Login);
