import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Step1InputForm from './Step1InputForm';
import useResendSignUp, { PAGE_STATUS } from './useResendSignUp';
import Step2ConfirmForm from './Step2ConfirmForm';
import NoticeComplete from './NoticeComplete';
import Step3ReLoginForm from './Step3ReLoginForm';
import LayoutH2u from '@/shared/components/LayoutH2u';

const ResendSignUp: React.FC = () => {
  const store = useResendSignUp();

  return (
    <LayoutH2u options={globalConfig}>
      {store.resendSignUpState.pageStatus === PAGE_STATUS.STEP1_INPUT && (
        <Step1InputForm {...store} />
      )}
      {store.resendSignUpState.pageStatus === PAGE_STATUS.STEP2_CONFIRM && (
        <Step2ConfirmForm {...store} />
      )}
      {store.resendSignUpState.pageStatus === PAGE_STATUS.STEP3_RE_LOGIN && (
        <Step3ReLoginForm {...store} />
      )}
      {store.resendSignUpState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default ResendSignUp;
