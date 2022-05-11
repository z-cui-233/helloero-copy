import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  STEP3_RE_LOGIN: 'STEP3_RE_LOGIN',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
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

const initialState: State = {
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

export type UseResendSignUp = {
  resendSignUpState: State;
  resendCode: (values: State['step1FormValues']) => Promise<void>;
  verifyCode: (values: State['step2FormValues']) => Promise<void>;
  invokeLogin: (values: State['step3FormValues']) => Promise<void>;
};

const useResendSignUp = (): UseResendSignUp => {
  const router = useRouter();
  const { resendSignUp, confirmSignUp, signIn } = useAmplifyAuth();
  const [state, setState] = useState<State>(initialState);
  const isLoading = useRef<boolean>(false);

  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const resendCode: UseResendSignUp['resendCode'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const resendSignUpResponse = await resendSignUp(values);
      isLoading.current = false;

      if (resendSignUpResponse.errorCode) {
        setState((state) => ({
          ...state,
          errorMessage: resendSignUpResponse.errorMessage,
          step1FormValues: values,
        }));
        return;
      }

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.STEP2_CONFIRM,
        errorMessage: '',
        step1FormValues: values,
      }));
    },
    [resendSignUp]
  );

  const verifyCode: UseResendSignUp['verifyCode'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const confirmSignUpResponse = await confirmSignUp({
        loginId: state.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });
      isLoading.current = false;

      if (confirmSignUpResponse.errorCode) {
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: values,
        }));
        return;
      }

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.STEP3_RE_LOGIN,
        errorMessage: '',
        step2FormValues: values,
      }));
    },
    [confirmSignUp, state.step1FormValues.loginId]
  );

  const invokeLogin: UseResendSignUp['invokeLogin'] = useCallback(
    async (values) => {
      const signInResponse = await signIn({
        loginId: state.step1FormValues.loginId,
        password: values.password,
      });

      if (signInResponse.errorCode) {
        setState((state) => ({
          ...state,
          errorMessage: signInResponse.errorMessage,
        }));

        return;
      }

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step3FormValues: values,
      }));
    },
    [state.step1FormValues.loginId, signIn]
  );

  useEffect(() => {
    if (state.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace('/');
      return;
    }

    setState((state) => ({
      ...state,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [isLoadedUserInfo, state.pageStatus, router, userInfo.isLoggedIn]);

  return {
    resendSignUpState: state,
    resendCode,
    verifyCode,
    invokeLogin,
  };
};

export default useResendSignUp;
