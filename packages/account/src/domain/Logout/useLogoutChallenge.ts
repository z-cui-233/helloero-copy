import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  CONFIRM: 'CONFIRM',
} as const;

type LogoutChallengeState = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
};

type UseLogoutChallenge = {
  logoutChallengeState: LogoutChallengeState;
  invokeLogOut: () => Promise<void>;
};

const useLogoutChallenge = (): UseLogoutChallenge => {
  const router = useRouter();
  const { signOut } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [logoutChallengeState, setLogoutChallengeState] =
    useState<LogoutChallengeState>({
      pageStatus: PAGE_STATUS.INIT,
    });
  const isLoading = useRef<boolean>(false);

  const invokeLogOut: UseLogoutChallenge['invokeLogOut'] =
    useCallback(async (): Promise<void> => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      await signOut();
      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignOut,
      });

      router.replace('/');
    }, [router, signOut]);

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (logoutChallengeState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!userInfo.isLoggedIn) {
      router.replace('/');
      return;
    }

    setLogoutChallengeState((logoutChallengeState) => ({
      ...logoutChallengeState,
      pageStatus: PAGE_STATUS.CONFIRM,
    }));
  }, [
    isLoadedUserInfo,
    logoutChallengeState.pageStatus,
    router,
    userInfo.isLoggedIn,
  ]);

  return {
    logoutChallengeState,
    invokeLogOut,
  };
};

export default useLogoutChallenge;
