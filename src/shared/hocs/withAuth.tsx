import { signIn } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import { useUserInfoContext } from '../context/UserInfoContext';

const withAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>
): React.FC<P> => {
  const ComponentWithLayout: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { isLoadedUserInfo, userInfo } = useUserInfoContext();

    useEffect(() => {
      (async () => {
        if (!isLoadedUserInfo) {
          return;
        }

        if (!userInfo.isLoggedIn) {
          await signIn();
        }

        setIsAuthenticated(true);
      })();
    }, [isLoadedUserInfo, userInfo.isLoggedIn]);

    return (
      <React.Fragment>
        {!isAuthenticated ? (
          <div>Loading</div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </React.Fragment>
    );
  };

  return ComponentWithLayout;
};

export default withAuth;
