import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { globalConfig } from 'src/globalConfig';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  NOTICE_PASSWORD_RESET_REQUIRED: 'NOTICE_PASSWORD_RESET_REQUIRED',
  NOTICE_USER_NOT_CONFIRMED: 'NOTICE_USER_NOT_CONFIRMED',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseLoginChallenge {
  loginChallengeState: {
    pageStatus: PageStatus;
    errorMessage: string;
    formValues: {
      loginId: string;
      password: string;
    };
  };
  challengeLogin: (
    values: UseLoginChallenge['loginChallengeState']['formValues']
  ) => Promise<void>;
}

const initialState: UseLoginChallenge['loginChallengeState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  formValues: {
    loginId: '',
    password: '',
  },
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
  const { locale, lang } = useLocale();
  const [loginChallengeState, setLoginChallengeState] =
    useState<UseLoginChallenge['loginChallengeState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const redirect = useCallback((): void => {
    const backUrl = router.query.back
      ? decodeURIComponent(router.query.back as string)
      : '';

    router.replace(isValidUrl(backUrl) ? backUrl : `/${locale}`);
  }, [locale, router]);

  const challengeLogin: UseLoginChallenge['challengeLogin'] = useCallback(
    async (values) => {
      try {
        await Auth.signIn(values.loginId, values.password);

        Hub.dispatch(UI_AUTH_CHANNEL, {
          event: AUTH_STATE_CHANGE_EVENT,
          message: AuthState.SignIn,
        });

        redirect();
      } catch (error: unknown) {
        const errorCode = error instanceof Error ? error.name : undefined;

        switch (errorCode) {
          case 'PasswordResetRequiredException': {
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
              pageStatus: PAGE_STATUS.NOTICE_PASSWORD_RESET_REQUIRED,
              errorMessage: '',
            }));
            break;
          }

          case 'UserNotConfirmedException': {
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
              pageStatus: PAGE_STATUS.NOTICE_USER_NOT_CONFIRMED,
              errorMessage: '',
            }));
            break;
          }

          default: {
            const errorMessage = getErrorMessage(lang, 'authSignIn', errorCode);
            setLoginChallengeState((loginChallengeState) => ({
              ...loginChallengeState,
              errorMessage,
            }));
            break;
          }
        }
      }
    },
    [lang, redirect]
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
