import { useLocale } from '@/shared/context/LocaleContext';
import { Auth } from 'aws-amplify';
import { useCallback, useState } from 'react';

export const PAGE_STATUS = {
  INPUT_EMAIL: 'INPUT_EMAIL',
  INPUT_VERIFICATION_CODE: 'INPUT_VERIFICATION_CODE',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseUpdateEmail {
  updateEmailState: {
    pageStatus: PageStatus;
    errorMessage: string;
    formValues: {
      email: string;
      verificationCode: string;
    };
  };
  confirmEmail: (values: { email: string }) => Promise<void>;
  verifyCode: (values: { verificationCode: string }) => Promise<void>;
}

const initialState: UseUpdateEmail['updateEmailState'] = {
  pageStatus: PAGE_STATUS.INPUT_EMAIL,
  errorMessage: '',
  formValues: {
    email: '',
    verificationCode: '',
  },
};

const useUpdateEmail = (): UseUpdateEmail => {
  const { lang } = useLocale();
  const [updateEmailState, setUpdateEmailState] =
    useState<UseUpdateEmail['updateEmailState']>(initialState);

  const confirmEmail: UseUpdateEmail['confirmEmail'] = useCallback(
    async (values) => {
      const user = await Auth.currentAuthenticatedUser();
      const response = await Auth.updateUserAttributes(user, {
        email: values.email,
      });

      const isError = response !== 'SUCCESS';
      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        pageStatus: isError
          ? PAGE_STATUS.INPUT_EMAIL
          : PAGE_STATUS.INPUT_VERIFICATION_CODE,
        errorMessage: isError ? lang.messages.default : '',
        formValues: {
          ...updateEmailState.formValues,
          email: values.email,
        },
      }));
    },
    [lang.messages.default]
  );

  const verifyCode: UseUpdateEmail['verifyCode'] = useCallback(
    async (values) => {
      const response = await Auth.verifyCurrentUserAttributeSubmit(
        'email',
        values.verificationCode
      );

      const isError = response !== 'SUCCESS';
      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        pageStatus: isError
          ? PAGE_STATUS.INPUT_VERIFICATION_CODE
          : PAGE_STATUS.COMPLETE,
        errorMessage: isError ? lang.messages.default : '',
      }));
    },
    [lang.messages.default]
  );

  return {
    updateEmailState,
    confirmEmail,
    verifyCode,
  };
};

export default useUpdateEmail;
