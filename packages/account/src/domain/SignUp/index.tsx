import React from 'react';
import { globalConfig } from 'src/globalConfig';
import NoticeComplete from './NoticeComplete';
import Step1InputForm from './Step1InputForm';
import Step2ConfirmForm from './Step2ConfirmForm';
import useSignUp, { PAGE_STATUS } from './useSignUp';
import LayoutH2u from '@/shared/components/LayoutH2u';

const SignUp: React.FC = () => {
  const store = useSignUp();

  return (
    <LayoutH2u options={globalConfig}>
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
