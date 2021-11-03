import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import React from 'react';

const AuthenticationForm: React.FC = () => {
  return (
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

export default AuthenticationForm;
