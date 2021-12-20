import React from 'react';
import styled from 'styled-components';
import withLayout from '@/shared/components/Layout';
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import useLogin from './useLogin';
import { globalConfig } from 'src/globalConfig';

const Login: React.FC = () => {
  const { isInitialized } = useLogin();

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

export default withLayout(Login, globalConfig);
