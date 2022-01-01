import { Hub } from 'aws-amplify';
import { useCallback, useState } from 'react';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

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
  const { userInfo } = useLoginStateContext();
  const { forgotPassword, forgotPasswordSubmit, signIn } = useAmplifyAuth();

  const [resetPasswordState, setResetPasswordState] =
    useState<UseResetPassword['resetPasswordState']>(initialState);

  const sendVerificationCode: UseResetPassword['sendVerificationCode'] =
    useCallback(
      async (values) => {
        const forgotPasswordResponse = await forgotPassword(values);

        if (forgotPasswordResponse.errorCode) {
          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            errorMessage: forgotPasswordResponse.errorMessage,
            formValues: {
              ...resetPasswordState.formValues,
              userName: values.loginId,
            },
          }));

          return;
        }

        setResetPasswordState((resetPasswordState) => ({
          ...resetPasswordState,
          pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
          errorMessage: '',
          destination:
            forgotPasswordResponse.data?.CodeDeliveryDetails?.Destination ?? '',
          formValues: {
            ...resetPasswordState.formValues,
            loginId: values.loginId,
          },
        }));
      },
      [forgotPassword]
    );

  const verifyCodeAndUpdatePassword: UseResetPassword['verifyCodeAndUpdatePassword'] =
    useCallback(
      async (values) => {
        const forgotPasswordSubmitResponse = await forgotPasswordSubmit({
          loginId: resetPasswordState.formValues.loginId,
          verificationCode: values.verificationCode,
          newPassword: values.newPassword,
        });

        if (forgotPasswordSubmitResponse.errorCode) {
          setResetPasswordState((resetPasswordState) => ({
            ...resetPasswordState,
            pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
            errorMessage: forgotPasswordSubmitResponse.errorMessage,
            formValues: {
              ...resetPasswordState.formValues,
              ...values,
            },
          }));
          return;
        }

        if (!userInfo.isLoggedIn) {
          const signInResponse = await signIn({
            loginId: resetPasswordState.formValues.loginId,
            password: values.newPassword,
          });

          if (signInResponse.errorCode) {
            setResetPasswordState((resetPasswordState) => ({
              ...resetPasswordState,
              pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
              errorMessage: signInResponse.errorMessage,
              formValues: {
                ...resetPasswordState.formValues,
                ...values,
              },
            }));
            return;
          }

          Hub.dispatch(UI_AUTH_CHANNEL, {
            event: AUTH_STATE_CHANGE_EVENT,
            message: AuthState.SignIn,
          });
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
      [
        forgotPasswordSubmit,
        resetPasswordState.formValues.loginId,
        signIn,
        userInfo.isLoggedIn,
      ]
    );

  return {
    resetPasswordState,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  };
};

export default useResetPassword;
