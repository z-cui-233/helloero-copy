import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import React from 'react';

type UserInfo = {
  isLoggedIn: boolean;
  userName: string | null;
  customUserId: string | null;
  email: string | null;
};

const initialState: UserInfo = {
  isLoggedIn: false,
  userName: '',
  customUserId: '',
  email: '',
};

const LoginStateContext = React.createContext({
  isLoadedUserInfo: false,
  userInfo: initialState,
});

type Props = {
  children: React.ReactNode;
};

const LoginStateContextProvider: React.VFC<Props> = ({ children }) => {
  const [isLoadedUserInfo, setIsLoadedUserInfo] =
    React.useState<boolean>(false);
  const [authState, setAuthState] = React.useState<AuthState>();
  const [userInfo, setUserInfo] = React.useState<UserInfo>(initialState);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setUserInfo({
          isLoggedIn: true,
          userName: user.username,
          customUserId: user.attributes['custom:userid'], // 少々強引な取り方
          email: user.attributes['email'], // 少々強引な取り方
        });
        setIsLoadedUserInfo(true);
      })
      .catch(() => {
        setUserInfo(initialState);
        setIsLoadedUserInfo(true);
      });
  }, [authState]);

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState) => {
      setAuthState(nextAuthState);
    });
  }, []);

  return (
    <LoginStateContext.Provider
      value={{
        isLoadedUserInfo,
        userInfo,
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
  const { isLoadedUserInfo, userInfo } = React.useContext(LoginStateContext);

  if (userInfo === null) {
    throw new Error('can not find LoginStateContextProvider');
  }

  return {
    isLoadedUserInfo,
    userInfo,
  };
};

export { LoginStateContextProvider, useLoginStateContext };
