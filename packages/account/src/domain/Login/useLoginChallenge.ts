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
import { useLocale } from '@/shared/context/LocaleContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  NOTICE_PASSWORD_RESET_REQUIRED: 'NOTICE_PASSWORD_RESET_REQUIRED',
  NOTICE_USER_NOT_CONFIRMED: 'NOTICE_USER_NOT_CONFIRMED',
} as const;

type LoginChallengeState = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    loginId: string;
    password: string;
  };
};

export type UseLoginChallenge = {
  loginChallengeState: LoginChallengeState;
  challengeLogin: (values: LoginChallengeState['formValues']) => Promise<void>;
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
  const { locale } = useLocale();
  const { signIn } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [loginChallengeState, setLoginChallengeState] =
    useState<LoginChallengeState>({
      pageStatus: PAGE_STATUS.INIT,
      errorMessage: '',
      formValues: {
        loginId: '',
        password: '',
      },
    });
  const isLoading = useRef<boolean>(false);

  const redirect = useCallback((): void => {
    const backUrl = router.query.back
      ? decodeURIComponent(router.query.back as string)
      : '';

    router.replace(isValidUrl(backUrl) ? backUrl : `/${locale}`);
  }, [locale, router]);

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
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
              pageStatus: PAGE_STATUS.NOTICE_PASSWORD_RESET_REQUIRED,
              errorMessage: '',
            }));
            return;
          }

          case 'UserNotConfirmedException': {
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
              pageStatus: PAGE_STATUS.NOTICE_USER_NOT_CONFIRMED,
              errorMessage: '',
            }));
            return;
          }

          default: {
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
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

    if (loginChallengeState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (userInfo.isLoggedIn) {
      redirect();
      return;
    }

    setLoginChallengeState((loginChallengeState) => ({
      ...loginChallengeState,
      pageStatus: PAGE_STATUS.INPUT,
    }));
  }, [
    isLoadedUserInfo,
    loginChallengeState.pageStatus,
    redirect,
    userInfo.isLoggedIn,
  ]);

  return {
    loginChallengeState,
    challengeLogin,
  };
};

export default useLoginChallenge;
