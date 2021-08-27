import React, { useContext } from 'react';
import { useSession } from 'next-auth/client';

interface UserInfo {
  isLoggedIn: boolean;
  email: string;
  name: string;
}

const initialState: UserInfo = {
  isLoggedIn: false,
  email: '',
  name: '',
};

const UserInfoContext = React.createContext({
  isLoadedUserInfo: false,
  userInfo: initialState,
});

const UserInfoContextProvider: React.FC = ({ children }) => {
  const [session, loading] = useSession();

  const mergedUserInfo: UserInfo = {
    isLoggedIn: !loading && !!session,
    email: session?.user?.email ?? '',
    name: session?.user?.name ?? '',
  };

  console.log(session);

  return (
    <UserInfoContext.Provider
      value={{
        isLoadedUserInfo: !loading,
        userInfo: mergedUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfoContext = (): {
  isLoadedUserInfo: boolean;
  userInfo: UserInfo;
} => {
  const { isLoadedUserInfo, userInfo } = useContext(UserInfoContext);

  if (userInfo === null) {
    throw new Error('can not find UserInfoContextProvider');
  }

  return {
    isLoadedUserInfo,
    userInfo,
  };
};

export { UserInfoContextProvider, useUserInfoContext };
