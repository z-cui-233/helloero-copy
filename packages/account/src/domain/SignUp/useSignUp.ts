import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ThanksApiRouteResponse } from 'src/pages/api/thanks';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';
import useVariousFetch from '@/shared/hooks/useVariousFetcher';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
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

const initialState: State = {
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

export type UseSignUp = {
  signUpState: State;
  challengeSignUp: (values: State['step1FormValues']) => Promise<void>;
  verifyCode: (values: State['step2FormValues']) => Promise<void>;
};

const useSignUp = (): UseSignUp => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);
  const { signUp, confirmSignUp, signIn } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { fetcher } = useVariousFetch<ThanksApiRouteResponse>();
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
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.STEP1_INPUT,
          errorMessage: signUpResponse.errorMessage,
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
    [isLoading, signUp]
  );

  const verifyCode: UseSignUp['verifyCode'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const confirmSignUpResponse = await confirmSignUp({
        loginId: state.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });

      if (confirmSignUpResponse.errorCode) {
        isLoading.current = false;
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: values,
        }));
        return;
      }

      await signIn({
        loginId: state.step1FormValues.loginId,
        password: state.step1FormValues.password,
      });

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      await fetcher('/api/thanks', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: state.step1FormValues.loginId,
          mailAddress: state.step1FormValues.email,
        }),
      });

      isLoading.current = false;
      setState((signUpState) => ({
        ...signUpState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step2FormValues: values,
      }));
    },
    [
      confirmSignUp,
      fetcher,
      signIn,
      state.step1FormValues.email,
      state.step1FormValues.loginId,
      state.step1FormValues.password,
    ]
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
  }, [isLoadedUserInfo, router, state.pageStatus, userInfo.isLoggedIn]);

  return {
    signUpState: state,
    challengeSignUp,
    verifyCode,
  };
};

export default useSignUp;
