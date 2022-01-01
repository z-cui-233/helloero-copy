import { Hub } from 'aws-amplify';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  STEP3_RE_LOGIN: 'STEP3_RE_LOGIN',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseResendSignUp {
  resendSignUpState: {
    pageStatus: PageStatus;
    errorMessage: string;
    step1FormValues: {
      loginId: string;
    };
    step2FormValues: {
      verificationCode: string;
    };
    step3FormValues: {
      password: string;
    };
  };
  resendCode: (values: { loginId: string }) => Promise<void>;
  verifyCode: (values: { verificationCode: string }) => Promise<void>;
  invokeLogin: (values: { password: string }) => Promise<void>;
}

const initialState: UseResendSignUp['resendSignUpState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  step1FormValues: {
    loginId: '',
  },
  step2FormValues: {
    verificationCode: '',
  },
  step3FormValues: {
    password: '',
  },
};

const useResendSignUp = (): UseResendSignUp => {
  const router = useRouter();
  const { resendSignUp, confirmSignUp, signIn } = useAmplifyAuth();
  const { locale } = useLocale();
  const [resendSignUpState, setResendSignupState] =
    useState<UseResendSignUp['resendSignUpState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const resendCode: UseResendSignUp['resendCode'] = useCallback(
    async (values) => {
      const resendSignUpResponse = await resendSignUp(values);
      if (resendSignUpResponse.errorCode) {
        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          errorMessage: resendSignUpResponse.errorMessage,
          step1FormValues: values,
        }));

        return;
      }
      setResendSignupState((resendSignUpState) => ({
        ...resendSignUpState,
        pageStatus: PAGE_STATUS.STEP2_CONFIRM,
        errorMessage: '',
        step1FormValues: values,
      }));
    },
    [resendSignUp]
  );

  const verifyCode: UseResendSignUp['verifyCode'] = useCallback(
    async (values) => {
      const confirmSignUpResponse = await confirmSignUp({
        loginId: resendSignUpState.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });

      if (confirmSignUpResponse.errorCode) {
        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: values,
        }));

        return;
      }

      setResendSignupState((resendSignUpState) => ({
        ...resendSignUpState,
        pageStatus: PAGE_STATUS.STEP3_RE_LOGIN,
        errorMessage: '',
        step2FormValues: values,
      }));
    },
    [confirmSignUp, resendSignUpState.step1FormValues.loginId]
  );

  const invokeLogin: UseResendSignUp['invokeLogin'] = useCallback(
    async (values) => {
      const signInResponse = await signIn({
        loginId: resendSignUpState.step1FormValues.loginId,
        password: values.password,
      });

      if (signInResponse.errorCode) {
        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          errorMessage: signInResponse.errorMessage,
        }));

        return;
      }

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      setResendSignupState((resendSignUpState) => ({
        ...resendSignUpState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step3FormValues: values,
      }));
    },
    [resendSignUpState.step1FormValues.loginId, signIn]
  );

  useEffect(() => {
    if (resendSignUpState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace(`/${locale}`);
      return;
    }

    setResendSignupState((resendSignUpState) => ({
      ...resendSignUpState,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [
    isLoadedUserInfo,
    locale,
    resendSignUpState.pageStatus,
    router,
    userInfo.isLoggedIn,
  ]);

  return {
    resendSignUpState,
    resendCode,
    verifyCode,
    invokeLogin,
  };
};

export default useResendSignUp;
