import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';
import { Auth } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { CodeDeliveryDetails } from 'u-next/amplify';

export const PAGE_STATUS = {
  SEND: 'SEND',
  INPUT: 'INPUT',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseResetPassword {
  resetPasswordState: {
    pageStatus: PageStatus;
    errorMessage: string;
    destination: string;
    formValues: {
      verificationCode: string;
      newPassword: string;
    };
  };
  sendVerificationCode: () => Promise<void>;
  verifyCodeAndUpdatePassword: (
    values: UseResetPassword['resetPasswordState']['formValues']
  ) => Promise<void>;
}

const initialState: UseResetPassword['resetPasswordState'] = {
  pageStatus: PAGE_STATUS.SEND,
  errorMessage: '',
  destination: '',
  formValues: {
    verificationCode: '',
    newPassword: '',
  },
};

const useResetPassword = () => {
  const { lang } = useLocale();
  const { userInfo } = useLoginStateContext();
  const [resetPasswordState, setResetPasswordState] =
    useState<UseResetPassword['resetPasswordState']>(initialState);

  const sendVerificationCode: UseResetPassword['sendVerificationCode'] =
    useCallback(async () => {
      const response: CodeDeliveryDetails | null = await Auth.forgotPassword(
        userInfo.userInfo?.username as string
      ).catch(() => {
        return null;
      });

      const isError = !response;

      setResetPasswordState((resetPasswordState) => ({
        ...resetPasswordState,
        pageStatus: isError ? PAGE_STATUS.SEND : PAGE_STATUS.INPUT,
        errorMessage: isError ? lang.messages.default : '',
        destination: response?.CodeDeliveryDetails?.Destination ?? '',
      }));
    }, [lang.messages.default, userInfo.userInfo?.username]);

  const verifyCodeAndUpdatePassword: UseResetPassword['verifyCodeAndUpdatePassword'] =
    useCallback(
      async (values) => {
        const response = await Auth.forgotPasswordSubmit(
          userInfo.userInfo?.username as string,
          values.verificationCode,
          values.newPassword
        ).catch((error: Error) => {
          return error.name;
        });

        const isError = response !== 'SUCCESS';
        const errorMessage = isError
          ? getErrorMessage(lang, 'authForgotPasswordSubmit', response)
          : '';

        setResetPasswordState((resetPasswordState) => ({
          ...resetPasswordState,
          pageStatus: isError ? PAGE_STATUS.INPUT : PAGE_STATUS.COMPLETE,
          errorMessage: errorMessage,
          formValues: values,
        }));
      },
      [lang, userInfo.userInfo?.username]
    );

  return {
    resetPasswordState,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  };
};

export default useResetPassword;
