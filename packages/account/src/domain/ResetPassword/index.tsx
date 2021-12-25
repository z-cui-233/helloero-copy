import LayoutH2u from '@/shared/components/LayoutH2u';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import useResetPassword, { PAGE_STATUS } from './useResetPassword';
import InputForm from './InputForm';
import SendVerificationCodeForm from './SendVerificationCodeForm';
import NoticeComplete from './NoticeComplete';

const ResetPassword: React.FC = () => {
  const store = useResetPassword();

  return (
    <LayoutH2u options={globalConfig}>
      {store.resetPasswordState.pageStatus === PAGE_STATUS.SEND_MAIL && (
        <SendVerificationCodeForm {...store} />
      )}
      {store.resetPasswordState.pageStatus === PAGE_STATUS.INPUT_PASSWORD && (
        <InputForm {...store} />
      )}
      {store.resetPasswordState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default ResetPassword;
