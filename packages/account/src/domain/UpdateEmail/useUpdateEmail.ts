import { useLocale } from '@/shared/context/LocaleContext';
import { getErrorMessage } from '@/shared/utils';
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
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
          email: values.email,
        });

        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_VERIFICATION_CODE,
          errorMessage: '',
          formValues: {
            ...updateEmailState.formValues,
            email: values.email,
          },
        }));
      } catch (error: unknown) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(
          lang,
          'authUpdateUserAttributes',
          errorCode
        );

        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_EMAIL,
          errorMessage,
          formValues: {
            ...updateEmailState.formValues,
            email: values.email,
          },
        }));
      }
    },
    [lang]
  );

  const verifyCode: UseUpdateEmail['verifyCode'] = useCallback(
    async (values) => {
      try {
        await Auth.verifyCurrentUserAttributeSubmit(
          'email',
          values.verificationCode
        );

        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.COMPLETE,
          errorMessage: '',
        }));
      } catch (error: unknown) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(
          lang,
          'authVerifyCurrentUserAttributeSubmit',
          errorCode
        );

        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_VERIFICATION_CODE,
          errorMessage,
        }));
      }
    },
    [lang]
  );

  return {
    updateEmailState,
    confirmEmail,
    verifyCode,
  };
};

export default useUpdateEmail;
