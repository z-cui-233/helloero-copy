import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';
import { Auth } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';
import { CodeDeliveryDetails } from 'u-next/amplify';

export const PAGE_STATUS = {
  INIT: 'INIT',
  SEND_MAIL: 'SEND_MAIL',
  INPUT_PASSWORD: 'INPUT_PASSWORD',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseResetPassword {
  resetPasswordState: {
    pageStatus: PageStatus;
    errorMessage: string;
    isLogin: boolean;
    destination: string;
    formValues: {
      userName: string;
      verificationCode: string;
      newPassword: string;
    };
  };
  sendVerificationCode: (values: { userName: string }) => Promise<void>;
  verifyCodeAndUpdatePassword: (values: {
    verificationCode: string;
    newPassword: string;
  }) => Promise<void>;
}

const initialState: UseResetPassword['resetPasswordState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  destination: '',
  isLogin: false,
  formValues: {
    userName: '',
    verificationCode: '',
    newPassword: '',
  },
};

const useResetPassword = () => {
  const { lang } = useLocale();
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const [resetPasswordState, setResetPasswordState] =
    useState<UseResetPassword['resetPasswordState']>(initialState);

  const sendVerificationCode: UseResetPassword['sendVerificationCode'] =
    useCallback(
      async (values) => {
        try {
          const response: CodeDeliveryDetails = await Auth.forgotPassword(
            values.userName
          );
          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.INPUT_PASSWORD,
            errorMessage: '',
            destination: response?.CodeDeliveryDetails?.Destination ?? '',
            formValues: {
              ...resetPasswordState.formValues,
              userName: values.userName,
            },
          }));
        } catch (error: unknown) {
          const errorCode = error instanceof Error ? error.name : undefined;
          const errorMessage = getErrorMessage(
            lang,
            'authForgotPassword',
            errorCode
          );

          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            errorMessage,
            formValues: {
              ...resetPasswordState.formValues,
              userName: values.userName,
            },
          }));
        }
      },
      [lang]
    );

  const verifyCodeAndUpdatePassword: UseResetPassword['verifyCodeAndUpdatePassword'] =
    useCallback(
      async (values) => {
        try {
          await Auth.forgotPasswordSubmit(
            resetPasswordState.formValues.userName,
            values.verificationCode,
            values.newPassword
          );

          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.COMPLETE,
            errorMessage: '',
            formValues: {
              ...resetPasswordState.formValues,
              ...values,
            },
          }));
        } catch (error: unknown) {
          const errorCode = error instanceof Error ? error.name : undefined;
          const errorMessage = getErrorMessage(
            lang,
            'authForgotPasswordSubmit',
            errorCode
          );

          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.INPUT_PASSWORD,
            errorMessage,
            formValues: {
              ...resetPasswordState.formValues,
              ...values,
            },
          }));
        }
      },
      [lang, resetPasswordState.formValues.userName]
    );

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }

    if (resetPasswordState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    // STEP1にログイン判定が必要なので、Load終わるまで待機
    setResetPasswordState((resetPasswordState) => ({
      ...resetPasswordState,
      pageStatus: PAGE_STATUS.SEND_MAIL,
      isLogin: userInfo.isLoggedIn,
    }));
  }, [isLoadedUserInfo, resetPasswordState.pageStatus, userInfo.isLoggedIn]);

  return {
    resetPasswordState,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  };
};

export default useResetPassword;
