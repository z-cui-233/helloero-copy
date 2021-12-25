import { Auth } from 'aws-amplify';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
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
      code: string;
    };
  };
  resendCode: (values: { loginId: string }) => Promise<void>;
  verifyCode: (values: { code: string }) => Promise<void>;
}

const initialState: UseResendSignUp['resendSignUpState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  step1FormValues: {
    loginId: '',
  },
  step2FormValues: {
    code: '',
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
          values.code
        );

        setResendSignupState((resendSignUpState) => ({
          ...resendSignUpState,
          pageStatus: PAGE_STATUS.COMPLETE,
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
  };
};

export default useResendSignUp;
