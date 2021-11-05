import React, { useEffect, useState } from 'react';
import withLayout from 'src/shared/components/Layout';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import { useRouter } from 'next/router';
import AuthenticationForm from 'src/shared/components/AuthenticationForm';

const Top: React.FC = () => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (!userInfo.isLoggedIn) {
      setIsInitialized(true);
      return;
    }

    const backPath = router.query.backpath
      ? (router.query.backpath as string)
      : '';

    router.replace(backPath ? decodeURIComponent(backPath) : '/my-library');
  }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

  return isInitialized ? <AuthenticationForm /> : <div />;
};

export default withLayout(Top);
