import { Auth, Hub } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { CodeDeliveryDetails } from 'u-next/amplify';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { useLocale } from '@/shared/context/LocaleContext';
import { getErrorMessage } from '@/shared/utils';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

export const PAGE_STATUS = {
  STEP1_SEND_MAIL: 'STEP1_SEND_MAIL',
  STEP2_INPUT_PASSWORD: 'STEP2_INPUT_PASSWORD',
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
      loginId: string;
      verificationCode: string;
      newPassword: string;
    };
  };
  sendVerificationCode: (values: { loginId: string }) => Promise<void>;
  verifyCodeAndUpdatePassword: (values: {
    verificationCode: string;
    newPassword: string;
  }) => Promise<void>;
}

const initialState: UseResetPassword['resetPasswordState'] = {
  pageStatus: PAGE_STATUS.STEP1_SEND_MAIL,
  errorMessage: '',
  destination: '',
  isLogin: false,
  formValues: {
    loginId: '',
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
    useCallback(
      async (values) => {
        try {
          const response: CodeDeliveryDetails = await Auth.forgotPassword(
            values.loginId
          );

          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
            errorMessage: '',
            destination: response?.CodeDeliveryDetails?.Destination ?? '',
            formValues: {
              ...resetPasswordState.formValues,
              loginId: values.loginId,
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
              userName: values.loginId,
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
            resetPasswordState.formValues.loginId,
            values.verificationCode,
            values.newPassword
          );
        } catch (error: unknown) {
          const errorCode = error instanceof Error ? error.name : undefined;
          const errorMessage = getErrorMessage(
            lang,
            'authForgotPasswordSubmit',
            errorCode
          );

          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
            errorMessage,
            formValues: {
              ...resetPasswordState.formValues,
              ...values,
            },
          }));
          return;
        }

        if (!userInfo.isLoggedIn) {
          try {
            await Auth.signIn(
              resetPasswordState.formValues.loginId,
              values.newPassword
            );

            Hub.dispatch(UI_AUTH_CHANNEL, {
              event: AUTH_STATE_CHANGE_EVENT,
              message: AuthState.SignIn,
            });
          } catch (error) {
            const errorCode = error instanceof Error ? error.name : undefined;
            const errorMessage = getErrorMessage(lang, 'authSignIn', errorCode);
            setResetPasswordState((resetPasswordState) => ({
              ...resetPasswordState,
              pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
              errorMessage,
              formValues: {
                ...resetPasswordState.formValues,
                ...values,
              },
            }));
          }
        }

        setResetPasswordState((resetPasswordState) => ({
          ...resetPasswordState,
          pageStatus: PAGE_STATUS.COMPLETE,
          errorMessage: '',
          formValues: {
            ...resetPasswordState.formValues,
            ...values,
          },
        }));
      },
      [lang, resetPasswordState.formValues.loginId, userInfo.isLoggedIn]
    );

  return {
    resetPasswordState,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  };
};

export default useResetPassword;
