import React from 'react';
import styled from 'styled-components';
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import useLogin from './useLogin';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';

const Login: React.FC = () => {
  const { isInitialized } = useLogin();

  return (
    <LayoutH2u options={globalConfig}>
      {isInitialized ? (
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
      ) : null}
    </LayoutH2u>
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0 0;
  position: relative;
`;

export default Login;
