import React, { useEffect, useState } from 'react';
import withLayout from 'src/shared/components/Layout';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import { useRouter } from 'next/router';
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
