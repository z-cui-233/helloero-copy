import React, { useContext, useEffect, useState } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

type UserInfo = {
  isLoggedIn: boolean;
  userName: string | null;
};

const initialState: UserInfo = {
  isLoggedIn: false,
  userName: '',
};

const LoginStateContext = React.createContext({
  isLoadedUserInfo: false,
  userInfo: initialState,
});

const LoginStateContextProvider: React.FC = ({ children }) => {
  const [isLoadedUserInfo, setIsLoadedUserInfo] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>();

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setUserName(user.username); // 少々強引な取り方
        setIsLoadedUserInfo(true);
      })
      .catch(() => {
        setIsLoadedUserInfo(true);
      });
  }, [authState]);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState) => {
      setAuthState(nextAuthState);
    });
  }, []);

  return (
    <LoginStateContext.Provider
      value={{
        isLoadedUserInfo,
        userInfo: {
          isLoggedIn: isLoadedUserInfo && !!userName,
          userName,
        },
      }}
    >
      {children}
    </LoginStateContext.Provider>
  );
};

const useLoginStateContext = (): {
  isLoadedUserInfo: boolean;
  userInfo: UserInfo;
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
