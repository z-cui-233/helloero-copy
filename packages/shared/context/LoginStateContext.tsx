import React, { useContext, useEffect, useState } from 'react';
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

interface LoginState {
  isLoggedIn: boolean;
  userInfo: CognitoUserInterface | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userInfo: null,
};

const LoginStateContext = React.createContext({
  isLoadedUserInfo: false,
  userInfo: initialState,
});

const LoginStateContextProvider: React.FC = ({ children }) => {
  const [isLoadedUserInfo, setIsLoadedUserInfo] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<CognitoUserInterface | null>(null);
  const [authState, setAuthState] = useState<AuthState>();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserInfo(user as CognitoUserInterface);
        setIsLoadedUserInfo(true);
      })
      .catch(() => {
        setUserInfo(null);
        setIsLoadedUserInfo(true);
      });
  }, [authState]);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState) => {
      setAuthState(nextAuthState);
    });
  }, []);

  const mergedUserInfo: LoginState = {
    isLoggedIn: isLoadedUserInfo && !!userInfo,
    userInfo,
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
