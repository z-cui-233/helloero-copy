import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  isDisplayedConfirmDialog: boolean;
  formValues: {
    check1: boolean;
    check2: boolean;
  };
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  isDisplayedConfirmDialog: false,
  formValues: {
    check1: false,
    check2: false,
  },
};

export type UseAccountDeletion = {
  accountDeletionState: State;
  toggleConfirmDialog: () => void;
  invokeDeletion: () => Promise<void>;
};

const useAccountDeletion = (): UseAccountDeletion => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { deleteUser } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const toggleConfirmDialog: UseAccountDeletion['toggleConfirmDialog'] =
    useCallback(() => {
      setState((state) => ({
        ...state,
        isDisplayedConfirmDialog: !state.isDisplayedConfirmDialog,
      }));
    }, []);

  const invokeDeletion: UseAccountDeletion['invokeDeletion'] =
    useCallback(async () => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const deleteUserResponse = await deleteUser();

      if (deleteUserResponse.errorCode) {
        setIsLoading(false);
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.CONFIRM,
          errorMessage: deleteUserResponse.errorMessage,
          isDisplayedConfirmDialog: false,
        }));
        return;
      }

      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignOut,
      });

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        isDisplayedConfirmDialog: false,
      }));
    }, [deleteUser, isLoading]);

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
    accountDeletionState: state,
    toggleConfirmDialog,
    invokeDeletion,
  };
};

export default useAccountDeletion;
