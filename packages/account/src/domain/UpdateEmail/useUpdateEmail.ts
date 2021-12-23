import { useCallback, useState } from 'react';

export const PAGE_STATUS = {
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

interface UseUpdateEmail {
  updateEmailState: {
    pageStatus: PageStatus;
    errorMessage: string;
    formValues: {
      email: string;
    };
  };
  confirmEmail: (
    values: UseUpdateEmail['updateEmailState']['formValues']
  ) => Promise<void>;
}

const initialState: UseUpdateEmail['updateEmailState'] = {
  pageStatus: PAGE_STATUS.INPUT,
  errorMessage: '',
  formValues: {
    email: '',
  },
};

const useUpdateEmail = (): UseUpdateEmail => {
  const [updateEmailState, setUpdateEmailState] =
    useState<UseUpdateEmail['updateEmailState']>(initialState);

  const confirmEmail: UseUpdateEmail['confirmEmail'] = useCallback(
    async (values) => {
      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        formValues: {
          email: values.email,
        },
      }));
    },
    []
  );

  return {
    updateEmailState,
    confirmEmail,
  };
};

export default useUpdateEmail;
