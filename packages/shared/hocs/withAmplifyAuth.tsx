import React, { useEffect } from 'react';
import { useLoginStateContext } from '../context/LoginStateContext';
import { useRouter } from 'next/router';
import { useLocale } from '../context/LocaleContext';
import { Config } from 'u-next/config';

const withAmplifyAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.FC<P>,
  options: Config
): React.FC<P> => {
  const ComponentWithAmplifyAuth: React.FC<P> = (props) => {
    const { locale } = useLocale();
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
        `${options.ACCOUNT}/${locale}/login?back=${encodeURIComponent(
          window.location.href
        )}`
      );
    }, [isLoadedUserInfo, locale, router, userInfo.isLoggedIn]);

    return isLoadedUserInfo && userInfo.isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return ComponentWithAmplifyAuth;
};

export default withAmplifyAuth;
