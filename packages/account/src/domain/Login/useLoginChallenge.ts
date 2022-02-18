import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { globalConfig } from 'src/globalConfig';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  NOTICE_PASSWORD_RESET_REQUIRED: 'NOTICE_PASSWORD_RESET_REQUIRED',
  NOTICE_USER_NOT_CONFIRMED: 'NOTICE_USER_NOT_CONFIRMED',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    loginId: string;
    password: string;
  };
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  formValues: {
    loginId: '',
    password: '',
  },
};

export type UseLoginChallenge = {
  loginChallengeState: State;
  challengeLogin: (values: State['formValues']) => Promise<void>;
};

const isValidUrl = (backUrl: string): boolean => {
  if (!backUrl) {
    return false;
  }

  try {
    return new URL(backUrl).hostname.endsWith(globalConfig.COOKIE_DOMAIN);
  } catch {
    return false;
  }
};

const useLoginChallenge = (): UseLoginChallenge => {
  const router = useRouter();
  const { signIn } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [state, setState] = useState<State>(initialState);
  const isLoading = useRef<boolean>(false);

  const redirect = useCallback((): void => {
    const backUrl = router.query.back
      ? decodeURIComponent(router.query.back as string)
      : '';

    router.replace(isValidUrl(backUrl) ? backUrl : globalConfig.HELLOERO);
  }, [router]);

  const challengeLogin: UseLoginChallenge['challengeLogin'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const signInResponse = await signIn(values);
      isLoading.current = false;

      if (signInResponse.errorCode) {
        switch (signInResponse.errorCode) {
          case 'PasswordResetRequiredException': {
            setState((state) => ({
              ...state,
              pageStatus: PAGE_STATUS.NOTICE_PASSWORD_RESET_REQUIRED,
              errorMessage: '',
            }));
            return;
          }

          case 'UserNotConfirmedException': {
            setState((state) => ({
              ...state,
              pageStatus: PAGE_STATUS.NOTICE_USER_NOT_CONFIRMED,
              errorMessage: '',
            }));
            return;
          }

          default: {
            setState((state) => ({
              ...state,
              errorMessage: signInResponse.errorMessage,
            }));
            return;
          }
        }
      }

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignIn,
      });

      redirect();
    },
    [redirect, signIn]
  );

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (state.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (userInfo.isLoggedIn) {
      redirect();
      return;
    }

    setState((state) => ({
      ...state,
      pageStatus: PAGE_STATUS.INPUT,
    }));
  }, [isLoadedUserInfo, state.pageStatus, redirect, userInfo.isLoggedIn]);

  return {
    loginChallengeState: state,
    challengeLogin,
  };
};

export default useLoginChallenge;
