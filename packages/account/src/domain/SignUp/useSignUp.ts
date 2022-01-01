import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { useLocale } from '@/shared/context/LocaleContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseSignUp {
  signupState: {
    pageStatus: PageStatus;
    errorMessage: string;
    step1FormValues: {
      loginId: string;
      password: string;
      email: string;
    };
    step2FormValues: {
      verificationCode: string;
    };
  };
  challengeSignUp: (
    values: UseSignUp['signupState']['step1FormValues']
  ) => Promise<void>;
  verifyCode: (
    values: UseSignUp['signupState']['step2FormValues']
  ) => Promise<void>;
}

const initialState: UseSignUp['signupState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  step1FormValues: {
    loginId: '',
    password: '',
    email: '',
  },
  step2FormValues: {
    verificationCode: '',
  },
};

const useSignUp = (): UseSignUp => {
  const router = useRouter();
  const { locale } = useLocale();
  const { signUp, confirmSignUp, signIn } = useAmplifyAuth();

  const [signupState, setSignupState] =
    useState<UseSignUp['signupState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const challengeSignUp: UseSignUp['challengeSignUp'] = useCallback(
    async (values) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const signUpResponse = await signUp(values);
      if (signUpResponse.errorCode) {
        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.STEP1_INPUT,
          errorMessage: signUpResponse.errorMessage,
          step1FormValues: {
            ...values,
          },
        }));
        setIsLoading(false);
        return;
      }

      setSignupState((signupState) => ({
        ...signupState,
        pageStatus: PAGE_STATUS.STEP2_CONFIRM,
        errorMessage: '',
        step1FormValues: {
          ...values,
        },
      }));
      setIsLoading(false);
    },
    [isLoading, signUp]
  );

  const verifyCode: UseSignUp['verifyCode'] = useCallback(
    async (values) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const confirmSignUpResponse = await confirmSignUp({
        loginId: signupState.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });

      if (confirmSignUpResponse.errorCode) {
        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: {
            ...values,
          },
        }));
        setIsLoading(false);
        return;
      }

      await signIn({
        loginId: signupState.step1FormValues.loginId,
        password: signupState.step1FormValues.password,
      });

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      setIsLoading(false);
      setSignupState((signupState) => ({
        ...signupState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step2FormValues: {
          ...values,
        },
      }));
    },
    [
      confirmSignUp,
      isLoading,
      signIn,
      signupState.step1FormValues.loginId,
      signupState.step1FormValues.password,
    ]
  );

  useEffect(() => {
    if (signupState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace(`/${locale}`);
      return;
    }

    setSignupState((signupState) => ({
      ...signupState,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [
    isLoadedUserInfo,
    locale,
    router,
    signupState.pageStatus,
    userInfo.isLoggedIn,
  ]);

  return {
    signupState,
    challengeSignUp,
    verifyCode,
  };
};

export default useSignUp;
