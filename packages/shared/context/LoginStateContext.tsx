import React, { useContext, useEffect, useState } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

type LoginState = {
  isLoggedIn: boolean;
  cognitoUserInfo: CognitoUser | null;
};

const initialState: LoginState = {
  isLoggedIn: false,
  cognitoUserInfo: null,
};

const LoginStateContext = React.createContext({
  isLoadedUserInfo: false,
  userInfo: initialState,
});

const LoginStateContextProvider: React.FC = ({ children }) => {
  const [isLoadedUserInfo, setIsLoadedUserInfo] = useState<boolean>(false);
  const [cognitoUserInfo, setCognitoUserInfo] = useState<CognitoUser | null>(
    null
  );
  const [authState, setAuthState] = useState<AuthState>();

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setCognitoUserInfo(user as CognitoUser);
        setIsLoadedUserInfo(true);
      })
      .catch(() => {
        setCognitoUserInfo(null);
        setIsLoadedUserInfo(true);
      });
  }, [authState]);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState) => {
      setAuthState(nextAuthState);
    });
  }, []);

  const mergedUserInfo: LoginState = {
    isLoggedIn: isLoadedUserInfo && !!cognitoUserInfo,
    cognitoUserInfo,
  };

  return (
    <LoginStateContext.Provider
      value={{
        isLoadedUserInfo,
        userInfo: mergedUserInfo,
      }}
    >
      {children}
    </LoginStateContext.Provider>
  );
};

const useLoginStateContext = (): {
  isLoadedUserInfo: boolean;
  userInfo: LoginState;
} => {
  const { isLoadedUserInfo, userInfo } = useContext(LoginStateContext);

  if (userInfo === null) {
    throw new Error('can not find LoginStateContextProvider');
  }

  return {
    isLoadedUserInfo,
    userInfo,
  };
};

export { LoginStateContextProvider, useLoginStateContext };
