import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { useLocale } from '@/shared/context/LocaleContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

type SignUpState = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
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

export type UseSignUp = {
  signUpState: SignUpState;
  challengeSignUp: (values: SignUpState['step1FormValues']) => Promise<void>;
  verifyCode: (values: SignUpState['step2FormValues']) => Promise<void>;
};

const useSignUp = (): UseSignUp => {
  const router = useRouter();
  const { locale } = useLocale();
  const { signUp, confirmSignUp, signIn } = useAmplifyAuth();

  const [signUpState, setSignUpState] = useState<SignUpState>({
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
  });
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const isLoading = useRef<boolean>(false);

  const challengeSignUp: UseSignUp['challengeSignUp'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const signUpResponse = await signUp(values);
      isLoading.current = false;

      if (signUpResponse.errorCode) {
        setSignUpState((signUpState) => ({
          ...signUpState,
          pageStatus: PAGE_STATUS.STEP1_INPUT,
          errorMessage: signUpResponse.errorMessage,
          step1FormValues: {
            ...values,
          },
        }));
        return;
      }

      setSignUpState((signUpState) => ({
        ...signUpState,
        pageStatus: PAGE_STATUS.STEP2_CONFIRM,
        errorMessage: '',
        step1FormValues: {
          ...values,
        },
      }));
    },
    [isLoading, signUp]
  );

  const verifyCode: UseSignUp['verifyCode'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const confirmSignUpResponse = await confirmSignUp({
        loginId: signUpState.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });

      if (confirmSignUpResponse.errorCode) {
        isLoading.current = false;
        setSignUpState((signUpState) => ({
          ...signUpState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: {
            ...values,
          },
        }));
        return;
      }

      await signIn({
        loginId: signUpState.step1FormValues.loginId,
        password: signUpState.step1FormValues.password,
      });

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      isLoading.current = false;
      setSignUpState((signUpState) => ({
        ...signUpState,
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
      signUpState.step1FormValues.loginId,
      signUpState.step1FormValues.password,
    ]
  );

  useEffect(() => {
    if (signUpState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace(`/${locale}`);
      return;
    }

    setSignUpState((signUpState) => ({
      ...signUpState,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [
    isLoadedUserInfo,
    locale,
    router,
    signUpState.pageStatus,
    userInfo.isLoggedIn,
  ]);

  return {
    signUpState,
    challengeSignUp,
    verifyCode,
  };
};

export default useSignUp;
