import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { ThanksApiRouteResponse } from 'src/pages/api/thanks';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';
import useTdBridge from '@/shared/hooks/useTdBridge';
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
  const [state, setState] = React.useState<State>(initialState);
  const { signUp, confirmSignUp, signIn } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { fetcher: thanksFetcher } = useVariousFetch<ThanksApiRouteResponse>();
  const { fetcher: tdBridgeFetcher } = useTdBridge();
  const isLoading = React.useRef<boolean>(false);

  const challengeSignUp: UseSignUp['challengeSignUp'] = React.useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const signUpResponse = await signUp(values);
      isLoading.current = false;

      if (signUpResponse.errorCode) {
        setState((prevState) => ({
          ...prevState,
          pageStatus: PAGE_STATUS.STEP1_INPUT,
          errorMessage: signUpResponse.errorMessage,
          step1FormValues: values,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.STEP2_CONFIRM,
        errorMessage: '',
        step1FormValues: values,
      }));
    },
    [signUp]
  );

  const verifyCode: UseSignUp['verifyCode'] = React.useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      /**
       * 1. Create account
       */
      const confirmSignUpResponse = await confirmSignUp({
        loginId: state.step1FormValues.loginId,
        verificationCode: values.verificationCode,
      });

      if (confirmSignUpResponse.errorCode) {
        isLoading.current = false;
        setState((prevState) => ({
          ...prevState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: values,
        }));
        return;
      }

      /**
       * 2. Login
       */
      await signIn({
        loginId: state.step1FormValues.loginId,
        password: state.step1FormValues.password,
      });

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      /**
       * 3. Send Thanks mail
       */
      await thanksFetcher('/api/thanks', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: state.step1FormValues.loginId,
          mailAddress: state.step1FormValues.email,
        }),
      });

      isLoading.current = false;
      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step2FormValues: values,
      }));
    },
    [
      confirmSignUp,
      signIn,
      state.step1FormValues.email,
      state.step1FormValues.loginId,
      state.step1FormValues.password,
      thanksFetcher,
    ]
  );

  React.useEffect(() => {
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

    setState((prevState) => ({
      ...prevState,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [isLoadedUserInfo, router, state.pageStatus, userInfo.isLoggedIn]);

  React.useEffect(() => {
    (async () => {
      if (state.pageStatus !== PAGE_STATUS.COMPLETE) {
        return;
      }

      if (!isLoadedUserInfo) {
        return;
      }

      if (!userInfo.isLoggedIn) {
        return;
      }

      await tdBridgeFetcher(globalConfig, 'user_account_log', {
        action_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        user_unique_key: userInfo.customUserId,
        user_multi_account_id: null,
        super_user_flg: 0,
        action_type: 'CREATE',
      });
    })();
  }, [
    isLoadedUserInfo,
    state.pageStatus,
    tdBridgeFetcher,
    userInfo.customUserId,
    userInfo.isLoggedIn,
  ]);

  return {
    signUpState: state,
    challengeSignUp,
    verifyCode,
  };
};

export default useSignUp;
