import React from 'react';
import { globalConfig } from 'src/globalConfig';
import NoticeComplete from './NoticeComplete';
import Step1InputForm from './Step1InputForm';
import Step2ConfirmForm from './Step2ConfirmForm';
import useSignUp, { PAGE_STATUS } from './useSignUp';
import LayoutH2u from '@/shared/components/LayoutH2u';
import { useLocale } from '@/shared/context/LocaleContext';
import BigBar from '@/shared/components/BigBar';

const SignUp: React.FC = () => {
  const store = useSignUp();
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.account.signUp.title} />
      {store.signupState.pageStatus === PAGE_STATUS.STEP1_INPUT && (
        <Step1InputForm {...store} />
      )}
      {store.signupState.pageStatus === PAGE_STATUS.STEP2_CONFIRM && (
        <Step2ConfirmForm {...store} />
      )}
      {store.signupState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default SignUp;
