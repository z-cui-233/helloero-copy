import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

interface UseTop {
  isInitialized: boolean;
}

const useTop = (): UseTop => {
  const { locale } = useLocale();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace(`/${locale}/my-library`);
      return;
    }

    setIsInitialized(true);
  }, [isLoadedUserInfo, locale, router, userInfo.isLoggedIn]);

  return {
    isInitialized,
  };
};

export default useTop;
