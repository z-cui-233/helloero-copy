import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { globalConfig } from 'src/globalConfig';

interface UseLogin {
  isInitialized: boolean;
}

const isValidUrl = (backUrl: string): boolean => {
  if (!backUrl) {
    return false;
  }

  try {
    return new URL(backUrl).hostname.endsWith(globalConfig.COOKIE_DOMAIN);
  } catch {
    return false;
  }
};

const useLogin = (): UseLogin => {
  const { locale } = useLocale();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      const backUrl = router.query.back
        ? decodeURIComponent(router.query.back as string)
        : '';

      router.replace(isValidUrl(backUrl) ? backUrl : `/${locale}`);
      return;
    }

    setIsInitialized(true);
  }, [isLoadedUserInfo, locale, router, userInfo.isLoggedIn]);

  return {
    isInitialized,
  };
};

export default useLogin;
