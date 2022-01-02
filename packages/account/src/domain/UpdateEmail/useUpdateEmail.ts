import { useCallback, useEffect, useRef, useState } from 'react';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

export const PAGE_STATUS = {
  INIT: 'INIT',
  RE_SEND_CURRENT_EMAIL: 'RE_SEND_CURRENT_EMAIL',
  INPUT_EMAIL: 'INPUT_EMAIL',
  INPUT_VERIFICATION_CODE: 'INPUT_VERIFICATION_CODE',
  COMPLETE: 'COMPLETE',
} as const;

type UpdateEmailState = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    email: string;
    verificationCode: string;
  };
};

export type UseUpdateEmail = {
  updateEmailState: UpdateEmailState;
  resendCurrentEmail: () => Promise<void>;
  requestNewEmail: () => void;
  confirmEmail: (values: { email: string }) => Promise<void>;
  verifyCode: (values: { verificationCode: string }) => Promise<void>;
};

const useUpdateEmail = (): UseUpdateEmail => {
  const {
    currentAuthenticatedUser,
    updateUserAttributes,
    verifyCurrentUserAttributeSubmit,
    verifyCurrentUserAttribute,
  } = useAmplifyAuth();
  const [updateEmailState, setUpdateEmailState] = useState<UpdateEmailState>({
    pageStatus: PAGE_STATUS.INIT,
    errorMessage: '',
    formValues: {
      email: '',
      verificationCode: '',
    },
  });
  const isLoading = useRef<boolean>(false);

  const resendCurrentEmail: UseUpdateEmail['resendCurrentEmail'] =
    useCallback(async () => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const verifyCurrentUserAttributeResponse =
        await verifyCurrentUserAttribute({ attr: 'email' });
      isLoading.current = false;

      if (verifyCurrentUserAttributeResponse.errorCode) {
        // ここでエラーになると、とても困るので、入力画面にしてしまう
        isLoading.current = false;
        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus: PAGE_STATUS.INPUT_EMAIL,
          errorMessage: verifyCurrentUserAttributeResponse.errorMessage,
        }));
        return;
      }

      setUpdateEmailState((updateEmailState) => ({
        ...updateEmailState,
        pageStatus: PAGE_STATUS.INPUT_VERIFICATION_CODE,
        errorMessage: '',
      }));
    }, [verifyCurrentUserAttribute]);

  const requestNewEmail: UseUpdateEmail['requestNewEmail'] = useCallback(() => {
    setUpdateEmailState((updateEmailState) => ({
      ...updateEmailState,
      pageStatus: PAGE_STATUS.INPUT_EMAIL,
      errorMessage: '',
    }));
  }, []);

  const confirmEmail: UseUpdateEmail['confirmEmail'] = useCallback(
    async (values) => {
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const currentAuthenticatedUserResponse = await currentAuthenticatedUser();
      if (currentAuthenticatedUserResponse.errorCode) {
        // ここでエラーになると、とても困る
        isLoading.current = false;
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
      isLoading.current = false;

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
      if (isLoading.current) {
        return;
      }
      isLoading.current = true;

      const verifyCurrentUserAttributeSubmitResponse =
        await verifyCurrentUserAttributeSubmit({
          attr: 'email',
          verificationCode: values.verificationCode,
        });
      isLoading.current = false;

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

  useEffect(() => {
    (async () => {
      const currentAuthenticatedUserResponse = await currentAuthenticatedUser();

      currentAuthenticatedUserResponse.data?.getUserData((e, data) => {
        const emailVerifiedStatus = data?.UserAttributes.find(
          (data) => data.Name === 'email_verified'
        );

        setUpdateEmailState((updateEmailState) => ({
          ...updateEmailState,
          pageStatus:
            emailVerifiedStatus && emailVerifiedStatus.Value === 'false'
              ? PAGE_STATUS.RE_SEND_CURRENT_EMAIL
              : PAGE_STATUS.INPUT_EMAIL,
        }));
      });
    })();
  }, [currentAuthenticatedUser]);

  return {
    updateEmailState,
    resendCurrentEmail,
    requestNewEmail,
    confirmEmail,
    verifyCode,
  };
};

export default useUpdateEmail;
