import { useCallback, useState } from 'react';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

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
  const {
    currentAuthenticatedUser,
    updateUserAttributes,
    verifyCurrentUserAttributeSubmit,
  } = useAmplifyAuth();
  const [updateEmailState, setUpdateEmailState] =
    useState<UseUpdateEmail['updateEmailState']>(initialState);

  const confirmEmail: UseUpdateEmail['confirmEmail'] = useCallback(
    async (values) => {
      const currentAuthenticatedUserResponse = await currentAuthenticatedUser();
      if (currentAuthenticatedUserResponse.errorCode) {
        // ここでエラーになると、とても困る
        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_EMAIL,
          errorMessage: currentAuthenticatedUserResponse.errorMessage,
          formValues: {
            ...updateEmailState.formValues,
            email: values.email,
          },
        }));

        return;
      }

      const updateUserAttributesResponse = await updateUserAttributes({
        user: currentAuthenticatedUserResponse.data,
        email: values.email,
      });

      if (updateUserAttributesResponse.errorCode) {
        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_EMAIL,
          errorMessage: updateUserAttributesResponse.errorMessage,
          formValues: {
            ...updateEmailState.formValues,
            email: values.email,
          },
        }));

        return;
      }

      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        pageStatus: PAGE_STATUS.INPUT_VERIFICATION_CODE,
        errorMessage: '',
        formValues: {
          ...updateEmailState.formValues,
          email: values.email,
        },
      }));
    },
    [currentAuthenticatedUser, updateUserAttributes]
  );

  const verifyCode: UseUpdateEmail['verifyCode'] = useCallback(
    async (values) => {
      const verifyCurrentUserAttributeSubmitResponse =
        await verifyCurrentUserAttributeSubmit({
          attr: 'email',
          verificationCode: values.verificationCode,
        });

      if (verifyCurrentUserAttributeSubmitResponse.errorCode) {
        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_VERIFICATION_CODE,
          errorMessage: verifyCurrentUserAttributeSubmitResponse.errorMessage,
        }));

        return;
      }

      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        pageStatus: PAGE_STATUS.COMPLETE,
        errorMessage: '',
      }));
    },
    [verifyCurrentUserAttributeSubmit]
  );

  return {
    updateEmailState,
    confirmEmail,
    verifyCode,
  };
};

export default useUpdateEmail;
