import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

type UseTop = {
  isInitialized: boolean;
};

const useTop = (): UseTop => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace('/my-library');
      return;
    }

    setIsInitialized(true);
  }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

  return {
    isInitialized,
  };
};

export default useTop;
