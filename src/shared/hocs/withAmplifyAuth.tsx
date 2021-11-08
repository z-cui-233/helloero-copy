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

      if (!userInfo.isLoggedIn) {
        router.push(`/login?backpath=${encodeURIComponent(router.asPath)}`);
        return;
      }
    }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

    return isLoadedUserInfo && userInfo.isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <div />
    );
  };

  return ComponentWithAmplifyAuth;
};

export default withAmplifyAuth;