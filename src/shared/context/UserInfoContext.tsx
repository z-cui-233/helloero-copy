import React, { useContext, useEffect, useState } from 'react';
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

interface UserInfo {
  isSignedIn: boolean;
}

const initialState: UserInfo = {
  isSignedIn: false,
};

const UserInfoContext = React.createContext({ userInfo: initialState });

const UserInfoContextProvider: React.FC = ({ children }) => {
  const [currentAuthState, setCurrentAuthState] = useState<AuthState>();
  const [user, setUser] = useState<CognitoUserInterface>();

  useEffect(() => {
    console.log('UserInfoContextProvider.useEffect');
    (async () => {
      console.log('UserInfoContextProvider.useEffect2');
      const test = await Auth.currentUserInfo().catch((err) =>
        console.log(err)
      );

      console.log('UserInfoContextProvider.useEffect3', test);

      onAuthUIStateChange((nextAuthState, authData) => {
        console.log('onAuthUIStateChange', { nextAuthState, authData });
        setCurrentAuthState(nextAuthState);
        setUser(authData as CognitoUserInterface);
      });
    })();
  }, []);

  const mergedUserInfo: UserInfo = {
    isSignedIn: !!AuthState.SignedIn && !!user,
  };

  console.log('UserInfoContextProvider', {
    user,
    AuthState,
    currentAuthState,
    mergedUserInfo,
  });

  return (
    <UserInfoContext.Provider value={{ userInfo: mergedUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfoContext = (): { userInfo: UserInfo } => {
  const { userInfo } = useContext(UserInfoContext);

  if (userInfo === null) {
    throw new Error('can not find UserInfoContextProvider');
  }

  return {
    userInfo,
  };
};

export { UserInfoContextProvider, useUserInfoContext };
