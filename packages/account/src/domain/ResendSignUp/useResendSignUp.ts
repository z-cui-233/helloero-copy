import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';

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
  const { locale, lang } = useLocale();
  const [resendSignUpState, setResendSignupState] =
    useState<UseResendSignUp['resendSignUpState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const resendCode: UseResendSignUp['resendCode'] = useCallback(
    async (values) => {
      try {
        await Auth.resendSignUp(values.loginId);

        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: '',
          step1FormValues: values,
        }));
      } catch (error) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(
          lang,
          'authResendSignUp',
          errorCode
        );

        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          errorMessage,
          step1FormValues: values,
        }));
      }
    },
    [lang]
  );

  const verifyCode: UseResendSignUp['verifyCode'] = useCallback(
    async (values) => {
      try {
        await Auth.confirmSignUp(
          resendSignUpState.step1FormValues.loginId,
          values.verificationCode
        );

        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          pageStatus: PAGE_STATUS.STEP3_RE_LOGIN,
          errorMessage: '',
          step2FormValues: values,
        }));
      } catch (error) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(
          lang,
          'authConfirmSignUp',
          errorCode
        );

        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage,
          step2FormValues: values,
        }));
      }
    },
    [lang, resendSignUpState.step1FormValues.loginId]
  );

  const invokeLogin: UseResendSignUp['invokeLogin'] = useCallback(
    async (values) => {
      try {
        await Auth.signIn(
          resendSignUpState.step1FormValues.loginId,
          values.password
        );

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
      } catch (error) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(lang, 'authSignIn', errorCode);
        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          errorMessage,
        }));
      }
    },
    [lang, resendSignUpState.step1FormValues.loginId]
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
