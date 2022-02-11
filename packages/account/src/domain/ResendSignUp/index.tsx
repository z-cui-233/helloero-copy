import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Step1InputForm from './Step1InputForm';
import useResendSignUp, { PAGE_STATUS } from './useResendSignUp';
import Step2ConfirmForm from './Step2ConfirmForm';
import NoticeComplete from './NoticeComplete';
import Step3ReLoginForm from './Step3ReLoginForm';
import LayoutH2u from '@/shared/components/LayoutH2u';
import BigBar from '@/shared/components/BigBar';

const ResendSignUp: React.FC = () => {
  const { resendSignUpState, resendCode, verifyCode, invokeLogin } =
    useResendSignUp();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title="アカウント登録の再開" />
      {resendSignUpState.pageStatus === PAGE_STATUS.STEP1_INPUT && (
        <Step1InputForm
          resendSignUpState={resendSignUpState}
          resendCode={resendCode}
        />
      )}
      {resendSignUpState.pageStatus === PAGE_STATUS.STEP2_CONFIRM && (
        <Step2ConfirmForm
          resendSignUpState={resendSignUpState}
          verifyCode={verifyCode}
        />
      )}
      {resendSignUpState.pageStatus === PAGE_STATUS.STEP3_RE_LOGIN && (
        <Step3ReLoginForm
          resendSignUpState={resendSignUpState}
          invokeLogin={invokeLogin}
        />
      )}
      {resendSignUpState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default ResendSignUp;
