import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withLayout from '@/shared/components/Layout';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import Landing from './Landing';

const Top: React.FC = () => {
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

  return isInitialized ? <Landing /> : null;
};

export default withLayout(Top);