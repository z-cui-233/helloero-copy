import React, { useEffect } from 'react';
import { useLoginStateContext } from '../context/LoginStateContext';
import { useRouter } from 'next/router';

const withAmplifyAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>
): React.FC<P> => {
  const ComponentWithAmplifyAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { isLoadedUserInfo, userInfo } = useLoginStateContext();

    useEffect(() => {
      if (!isLoadedUserInfo) {
        return;
      }

      if (userInfo.isLoggedIn) {
        return;
      }

      router.replace(`/login?backpath=${encodeURIComponent(router.asPath)}`);
    }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

    return isLoadedUserInfo && userInfo.isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return ComponentWithAmplifyAuth;
};

export default withAmplifyAuth;
