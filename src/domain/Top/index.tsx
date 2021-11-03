import React, { useEffect, useState } from 'react';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';
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

    router.replace('/my-library');
  }, [isLoadedUserInfo, router, userInfo.isLoggedIn]);

  return <Container>{isInitialized && <AuthenticationForm />}</Container>;
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0;
  position: relative;
`;

export default withLayout(Top);
