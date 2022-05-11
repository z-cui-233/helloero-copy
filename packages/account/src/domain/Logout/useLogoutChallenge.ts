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
  CONFIRM: 'CONFIRM',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
};

export type UseLogoutChallenge = {
  logoutChallengeState: State;
  invokeLogOut: () => Promise<void>;
};

const useLogoutChallenge = (): UseLogoutChallenge => {
  const router = useRouter();
  const { signOut } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [state, setState] = useState<State>(initialState);
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

    if (state.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!userInfo.isLoggedIn) {
      router.replace('/');
      return;
    }

    setState((state) => ({
      ...state,
      pageStatus: PAGE_STATUS.CONFIRM,
    }));
  }, [isLoadedUserInfo, state.pageStatus, router, userInfo.isLoggedIn]);

  return {
    logoutChallengeState: state,
    invokeLogOut,
  };
};

export default useLogoutChallenge;
