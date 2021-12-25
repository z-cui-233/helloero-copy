import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Auth, Hub } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';

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
  const { locale } = useLocale();
  const [logoutChallengeState, setLogoutChallengeState] =
    useState<UseLogoutChallenge['logoutChallengeState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const invokeLogOut: UseLogoutChallenge['invokeLogOut'] =
    useCallback(async (): Promise<void> => {
      try {
        await Auth.signOut();
        Hub.dispatch(UI_AUTH_CHANNEL, {
          event: AUTH_STATE_CHANGE_EVENT,
          message: AuthState.SignOut,
        });
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      location.replace(`/${locale}`);
    }, [locale]);

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
