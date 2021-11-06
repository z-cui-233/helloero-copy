import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import React from 'react';
import styled from 'styled-components';

const AuthenticationForm: React.FC = () => {
  return (
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
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0 0;
  position: relative;
`;

export default AuthenticationForm;
