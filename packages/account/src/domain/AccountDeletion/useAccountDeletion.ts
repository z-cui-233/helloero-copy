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
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';
import useTdBridge from '@/shared/hooks/useTdBridge';

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
  const [state, setState] = React.useState<State>(initialState);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { deleteUser } = useAmplifyAuth();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { fetcher: tdBridgeFetcher } = useTdBridge();

  const toggleConfirmDialog: UseAccountDeletion['toggleConfirmDialog'] =
    React.useCallback(() => {
      setState((prevState) => ({
        ...prevState,
        isDisplayedConfirmDialog: !prevState.isDisplayedConfirmDialog,
      }));
    }, []);

  const invokeDeletion: UseAccountDeletion['invokeDeletion'] =
    React.useCallback(async () => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      /**
       * 1. Deletion Account
       */
      const deleteUserResponse = await deleteUser();
      if (deleteUserResponse.errorCode) {
        setIsLoading(false);
        setState((prevState) => ({
          ...prevState,
          pageStatus: PAGE_STATUS.CONFIRM,
          errorMessage: deleteUserResponse.errorMessage,
          isDisplayedConfirmDialog: false,
        }));
        return;
      }

      /**
       * 2. Send TreasureData
       */
      await tdBridgeFetcher(globalConfig, 'user_account_log', {
        action_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        user_unique_key: userInfo.customUserId,
        user_multi_account_id: null,
        super_user_flg: 0,
        action_type: 'DELETE',
      });

      /**
       * 3. Logout
       */
      Hub.dispatch(UI_AUTH_CHANNEL, {
        event: AUTH_STATE_CHANGE_EVENT,
        message: AuthState.SignOut,
      });

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
        isDisplayedConfirmDialog: false,
      }));
    }, [deleteUser, isLoading, tdBridgeFetcher, userInfo.customUserId]);

  React.useEffect(() => {
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

    setState((prevState) => ({
      ...prevState,
      pageStatus: PAGE_STATUS.CONFIRM,
    }));
  }, [isLoadedUserInfo, router, state.pageStatus, userInfo.isLoggedIn]);

  return {
    accountDeletionState: state,
    toggleConfirmDialog,
    invokeDeletion,
  };
};

export default useAccountDeletion;
