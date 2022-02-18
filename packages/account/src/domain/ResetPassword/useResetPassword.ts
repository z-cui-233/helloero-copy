import { Hub } from 'aws-amplify';
import { useCallback, useRef, useState } from 'react';
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

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  isLogin: boolean;
  destination: string;
  formValues: {
    loginId: string;
    verificationCode: string;
    newPassword: string;
  };
};

const initialState: State = {
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

export type UseResetPassword = {
  resetPasswordState: State;
  sendVerificationCode: (values: { loginId: string }) => Promise<void>;
  verifyCodeAndUpdatePassword: (values: {
    verificationCode: string;
    newPassword: string;
  }) => Promise<void>;
};

const useResetPassword = () => {
  const { userInfo } = useLoginStateContext();
  const { forgotPassword, forgotPasswordSubmit, signIn } = useAmplifyAuth();
  const [state, setState] = useState<State>(initialState);
  const isLoading = useRef<boolean>(false);

  const sendVerificationCode: UseResetPassword['sendVerificationCode'] =
    useCallback(
      async (values) => {
        if (isLoading.current) {
          return;
        }
        isLoading.current = true;

        const forgotPasswordResponse = await forgotPassword(values);
        isLoading.current = false;

        if (forgotPasswordResponse.errorCode) {
          setState((state) => ({
            ...state,
            errorMessage: forgotPasswordResponse.errorMessage,
            formValues: {
              ...state.formValues,
              userName: values.loginId,
            },
          }));
          return;
        }

        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
          errorMessage: '',
          destination:
            forgotPasswordResponse.data?.CodeDeliveryDetails?.Destination ?? '',
          formValues: {
            ...state.formValues,
            loginId: values.loginId,
          },
        }));
      },
      [forgotPassword]
    );

  const verifyCodeAndUpdatePassword: UseResetPassword['verifyCodeAndUpdatePassword'] =
    useCallback(
      async (values) => {
        if (isLoading.current) {
          return;
        }
        isLoading.current = true;

        const forgotPasswordSubmitResponse = await forgotPasswordSubmit({
          loginId: state.formValues.loginId,
          verificationCode: values.verificationCode,
          newPassword: values.newPassword,
        });

        if (forgotPasswordSubmitResponse.errorCode) {
          isLoading.current = false;
          setState((state) => ({
            ...state,
            pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
            errorMessage: forgotPasswordSubmitResponse.errorMessage,
            formValues: {
              ...state.formValues,
              ...values,
            },
          }));
          return;
        }

        if (!userInfo.isLoggedIn) {
          const signInResponse = await signIn({
            loginId: state.formValues.loginId,
            password: values.newPassword,
          });

          if (signInResponse.errorCode) {
            isLoading.current = false;
            setState((state) => ({
              ...state,
              pageStatus: PAGE_STATUS.STEP2_INPUT_PASSWORD,
              errorMessage: signInResponse.errorMessage,
              formValues: {
                ...state.formValues,
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

        isLoading.current = true;
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.COMPLETE,
          errorMessage: '',
          formValues: {
            ...state.formValues,
            ...values,
          },
        }));
      },
      [
        forgotPasswordSubmit,
        state.formValues.loginId,
        signIn,
        userInfo.isLoggedIn,
      ]
    );

  return {
    resetPasswordState: state,
    sendVerificationCode,
    verifyCodeAndUpdatePassword,
  };
};

export default useResetPassword;
