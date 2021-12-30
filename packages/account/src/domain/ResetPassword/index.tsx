import React from 'react';
import { globalConfig } from 'src/globalConfig';
import useResetPassword, { PAGE_STATUS } from './useResetPassword';
import InputForm from './InputForm';
import SendVerificationCodeForm from './SendVerificationCodeForm';
import NoticeComplete from './NoticeComplete';
import LayoutH2u from '@/shared/components/LayoutH2u';
import BigBar from '@/shared/components/BigBar';
import { useLocale } from '@/shared/context/LocaleContext';

const ResetPassword: React.FC = () => {
  const store = useResetPassword();
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.account.resetPassword.title} />
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
