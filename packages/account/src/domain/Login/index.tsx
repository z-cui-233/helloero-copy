import React from 'react';
import useLoginChallenge, { PAGE_STATUS } from './useLoginChallenge';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import InputForm from './InputForm';
import NoticePasswordResetRequired from './NoticePasswordResetRequired';
import NoticeUserNotConfirmed from './NoticeUserNotConfirmed';

const Login: React.FC = () => {
  const store = useLoginChallenge();

  return (
    <LayoutH2u options={globalConfig}>
      {store.loginChallengeState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm {...store} />
      )}
      {store.loginChallengeState.pageStatus ===
        PAGE_STATUS.NOTICE_PASSWORD_RESET_REQUIRED && (
        <NoticePasswordResetRequired />
      )}
      {store.loginChallengeState.pageStatus ===
        PAGE_STATUS.NOTICE_USER_NOT_CONFIRMED && <NoticeUserNotConfirmed />}
    </LayoutH2u>
  );
};

export default Login;
