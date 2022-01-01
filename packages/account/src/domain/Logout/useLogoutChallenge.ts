import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { useLocale } from '@/shared/context/LocaleContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  CONFIRM: 'CONFIRM',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

interface UseLogoutChallenge {
  logoutChallengeState: {
    pageStatus: PageStatus;
  };
  invokeLogOut: () => Promise<void>;
}

const initialState: UseLogoutChallenge['logoutChallengeState'] = {
  pageStatus: PAGE_STATUS.INIT,
};

const useLogoutChallenge = (): UseLogoutChallenge => {
  const router = useRouter();
  const { locale } = useLocale();
  const { signOut } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [logoutChallengeState, setLogoutChallengeState] =
    useState<UseLogoutChallenge['logoutChallengeState']>(initialState);

  const invokeLogOut: UseLogoutChallenge['invokeLogOut'] =
    useCallback(async (): Promise<void> => {
      await signOut();

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignOut,
      });

      router.replace(`/${locale}`);
    }, [locale, router, signOut]);

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (logoutChallengeState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!userInfo.isLoggedIn) {
      location.replace(`/${locale}`);
      return;
    }

    setLogoutChallengeState((logoutChallengeState) => ({
      ...logoutChallengeState,
      pageStatus: PAGE_STATUS.CONFIRM,
    }));
  }, [
    isLoadedUserInfo,
    locale,
    logoutChallengeState.pageStatus,
    userInfo.isLoggedIn,
  ]);

  return {
    logoutChallengeState,
    invokeLogOut,
  };
};

export default useLogoutChallenge;
