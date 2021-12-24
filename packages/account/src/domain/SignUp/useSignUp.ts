import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { getErrorMessage } from '@/shared/utils';
import {
  AuthState,
  AUTH_STATE_CHANGE_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components';
import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const PAGE_STATUS = {
  INIT: 'INIT',
  STEP1_INPUT: 'STEP1_INPUT',
  STEP2_CONFIRM: 'STEP2_CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseSignUp {
  signupState: {
    pageStatus: PageStatus;
    errorMessage: string;
    step1FormValues: {
      loginId: string;
      password: string;
      email: string;
    };
    step2FormValues: {
      code: string;
    };
  };
  challengeSignUp: (
    values: UseSignUp['signupState']['step1FormValues']
  ) => Promise<void>;
  verifyCode: (
    values: UseSignUp['signupState']['step2FormValues']
  ) => Promise<void>;
}

const initialState: UseSignUp['signupState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  step1FormValues: {
    loginId: '',
    password: '',
    email: '',
  },
  step2FormValues: {
    code: '',
  },
};

const useSignUp = (): UseSignUp => {
  const router = useRouter();
  const { locale, lang } = useLocale();
  const [signupState, setSignupState] =
    useState<UseSignUp['signupState']>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const challengeSignUp: UseSignUp['challengeSignUp'] = useCallback(
    async (values) => {
      try {
        if (isLoading) {
          return;
        }

        setIsLoading(true);

        await Auth.signUp({
          username: values.loginId,
          password: values.password,
          attributes: {
            email: values.email,
          },
        });

        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage: '',
          step1FormValues: {
            ...values,
          },
        }));
      } catch (error: unknown) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(lang, 'authSignUp', errorCode);

        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.STEP1_INPUT,
          errorMessage,
          step1FormValues: {
            ...values,
          },
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, lang]
  );

  const verifyCode: UseSignUp['verifyCode'] = useCallback(
    async (values) => {
      try {
        if (isLoading) {
          return;
        }

        setIsLoading(true);
        await Auth.confirmSignUp(
          signupState.step1FormValues.loginId,
          values.code
        );
      } catch (error) {
        const errorCode = error instanceof Error ? error.name : undefined;
        const errorMessage = getErrorMessage(
          lang,
          'authConfirmSignUp',
          errorCode
        );

        setIsLoading(false);
        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.STEP2_CONFIRM,
          errorMessage,
          step2FormValues: {
            ...values,
          },
        }));
        return;
      }

      try {
        await Auth.signIn(
          signupState.step1FormValues.loginId,
          signupState.step1FormValues.password
        );

        Hub.dispatch(UI_AUTH_CHANNEL, {
          event: AUTH_STATE_CHANGE_EVENT,
          message: AuthState.SignIn,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsLoading(false);
        setSignupState((signupState) => ({
          ...signupState,
          pageStatus: PAGE_STATUS.COMPLETE,
          errorMessage: '',
          step2FormValues: {
            ...values,
          },
        }));
      }
    },
    [
      isLoading,
      lang,
      signupState.step1FormValues.loginId,
      signupState.step1FormValues.password,
    ]
  );

  useEffect(() => {
    if (signupState.pageStatus !== PAGE_STATUS.INIT) {
      return;
    }

    if (!isLoadedUserInfo) {
      return;
    }

    if (userInfo.isLoggedIn) {
      router.replace(`/${locale}`);
      return;
    }

    setSignupState((signupState) => ({
      ...signupState,
      pageStatus: PAGE_STATUS.STEP1_INPUT,
    }));
  }, [
    isLoadedUserInfo,
    locale,
    router,
    signupState.pageStatus,
    userInfo.isLoggedIn,
  ]);

  return {
    signupState,
    challengeSignUp,
    verifyCode,
  };
};

export default useSignUp;
