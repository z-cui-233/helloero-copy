import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth, I18n } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import awsConfig from 'src/awsConfig';
import { vocabularies } from 'src/shared/assets/i18n/amplify/vocabularies';

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

const withAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>
): React.FC<P> => {
  const ComponentWithLayout: React.FC<P> = (props) => {
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<CognitoUserInterface>();

    useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData as CognitoUserInterface);
      });
    }, []);

    // console.log('user', user, authState);

    return authState === AuthState.SignedIn && user ? (
      <div className="App">
        <div>Hello, {user.username}</div>
        <WrappedComponent {...props} />
        <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
        {/* <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: 'username' },
            { type: 'password' },
            { type: 'email' },
          ]}
        /> */}
      </AmplifyAuthenticator>
    );
  };

  return ComponentWithLayout;
};

export default withAuth;
