import React from 'react';
import { globalConfig } from 'src/globalConfig';
import useLoginChallenge, { PAGE_STATUS } from './useLoginChallenge';
import InputForm from './InputForm';
import NoticePasswordResetRequired from './NoticePasswordResetRequired';
import NoticeUserNotConfirmed from './NoticeUserNotConfirmed';
import LayoutH2u from '@/shared/components/LayoutH2u';

const Login: React.FC = () => {
  const { loginChallengeState, challengeLogin } = useLoginChallenge();

  return (
    <LayoutH2u options={globalConfig}>
      {loginChallengeState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm
          loginChallengeState={loginChallengeState}
          challengeLogin={challengeLogin}
        />
      )}
      {loginChallengeState.pageStatus ===
        PAGE_STATUS.NOTICE_PASSWORD_RESET_REQUIRED && (
        <NoticePasswordResetRequired />
      )}
      {loginChallengeState.pageStatus ===
        PAGE_STATUS.NOTICE_USER_NOT_CONFIRMED && <NoticeUserNotConfirmed />}
    </LayoutH2u>
  );
};

export default Login;
