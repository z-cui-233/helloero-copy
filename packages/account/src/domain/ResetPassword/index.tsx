import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import useResetPassword, { PAGE_STATUS } from './useResetPassword';
import ResetPasswordStep1 from './ResetPasswordStep1';
import NoticeComplete from './NoticeComplete';
import ResetPasswordStep2 from './ResetPasswordStep2';

const ResetPassword: React.FC = () => {
  const {
    resetPasswordState,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  } = useResetPassword();

  return (
    <LayoutH2u options={globalConfig}>
      {resetPasswordState.pageStatus === PAGE_STATUS.STEP1_SEND_MAIL && (
        <ResetPasswordStep1
          resetPasswordState={resetPasswordState}
          sendVerificationCode={sendVerificationCode}
        />
      )}
      {resetPasswordState.pageStatus === PAGE_STATUS.STEP2_INPUT_PASSWORD && (
        <ResetPasswordStep2
          resetPasswordState={resetPasswordState}
          verifyCodeAndUpdatePassword={verifyCodeAndUpdatePassword}
        />
      )}
      {resetPasswordState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default ResetPassword;
