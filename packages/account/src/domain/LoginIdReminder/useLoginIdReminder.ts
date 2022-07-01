import React from 'react';
import { ReminderApiRouteResponse } from 'src/pages/api/reminder';
import useVariousFetch from '@/shared/hooks/useVariousFetcher';

export const PAGE_STATUS = {
  INPUT: 'INPUT',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    mailAddress: string;
  };
};

export type UseLoginIdReminder = {
  loginIdReminderState: State;
  sendReminder: (values: State['formValues']) => Promise<void>;
};

const useLoginIdReminder = (): UseLoginIdReminder => {
  const { fetcher } = useVariousFetch<ReminderApiRouteResponse>();
  const [state, setState] = React.useState<State>({
    pageStatus: PAGE_STATUS.INPUT,
    errorMessage: '',
    formValues: {
      mailAddress: '',
    },
  });

  const sendReminder: UseLoginIdReminder['sendReminder'] = React.useCallback(
    async (values) => {
      await fetcher('/api/reminder', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mailAddress: values.mailAddress,
        }),
      });

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.COMPLETE,
      }));
    },
    [fetcher]
  );

  return {
    loginIdReminderState: state,
    sendReminder,
  };
};

export default useLoginIdReminder;
