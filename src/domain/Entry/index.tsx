import React, { useEffect, useState } from 'react';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import AuthenticationForm from 'src/shared/components/AuthenticationForm';
import InputForm from './InputForm';

const PAGE_STATUS = {
  INIT: 'INIT',
  LOGIN: 'LOGIN',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

interface Props {
  wabiken: string;
}

const Entry: React.FC<Props> = ({ wabiken }) => {
  const [pageState, setPageState] = useState<PageStatus>(PAGE_STATUS.INIT);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (!userInfo.isLoggedIn) {
      setPageState(PAGE_STATUS.LOGIN);
      return;
    }

    if (!wabiken) {
      setPageState(PAGE_STATUS.INPUT);
      return;
    }

    setPageState(PAGE_STATUS.CONFIRM);
  }, [isLoadedUserInfo, userInfo.isLoggedIn, wabiken]);

  return (
    <Container>
      {pageState === PAGE_STATUS.INIT && <div>init</div>}
      {pageState === PAGE_STATUS.LOGIN && <AuthenticationForm />}
      {pageState === PAGE_STATUS.INPUT && <InputForm />}
      {pageState === PAGE_STATUS.CONFIRM && <div>confirm</div>}
    </Container>
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0;
  position: relative;
`;

export default withLayout(Entry);
