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
  const [state, setState] = React.useState<State>(initialState);
  const { fetcher: thanksFetcher } = useVariousFetch<ThanksApiRouteResponse>();
  const { fetcher: tdBridgeFetcher } = useTdBridge();
  const isLoading = React.useRef<boolean>(false);

  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const resendCode: UseResendSignUp['resendCode'] = React.useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const resendSignUpResponse = await resendSignUp(values);
      isLoading.current = false;

      if (resendSignUpResponse.errorCode) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: resendSignUpResponse.errorMessage,
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
    [resendSignUp]
  );

  const verifyCode: UseResendSignUp['verifyCode'] = React.useCallback(
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
        setState((prevState) => ({
          ...prevState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: confirmSignUpResponse.errorMessage,
          step2FormValues: values,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.STEP3_RE_LOGIN,
        errorMessage: '',
        step2FormValues: values,
      }));
    },
    [confirmSignUp, state.step1FormValues.loginId]
  );

  const invokeLogin: UseResendSignUp['invokeLogin'] = React.useCallback(
    async (values) => {
      const signInResponse = await signIn({
        loginId: state.step1FormValues.loginId,
        password: values.password,
      });

      if (signInResponse.errorCode) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: signInResponse.errorMessage,
        }));

        return;
      }

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        step3FormValues: values,
      }));
    },
    [state.step1FormValues.loginId, signIn]
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
  }, [isLoadedUserInfo, state.pageStatus, router, userInfo.isLoggedIn]);

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

      /**
       * 1. Send Thanks mail
       */
      await thanksFetcher('/api/thanks', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: userInfo.userName,
          mailAddress: userInfo.email,
        }),
      });

      /**
       * 2. Send TreasureData
       */
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
    thanksFetcher,
    userInfo.customUserId,
    userInfo.email,
    userInfo.isLoggedIn,
    userInfo.userName,
  ]);

  return {
    resendSignUpState: state,
    resendCode,
    verifyCode,
    invokeLogin,
  };
};

export default useResendSignUp;
