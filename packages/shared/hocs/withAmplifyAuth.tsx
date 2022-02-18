import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Config } from 'u-next/config';
import { useLoginStateContext } from '../context/LoginStateContext';

const withAmplifyAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>,
  options: Config
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

      router.replace(
        `${options.ACCOUNT}/login?back=${encodeURIComponent(
          window.location.href
        )}`
      );
    }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

    return isLoadedUserInfo && userInfo.isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return ComponentWithAmplifyAuth;
};

export default withAmplifyAuth;
