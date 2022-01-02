import { Auth } from 'aws-amplify';
import { useCallback } from 'react';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { CodeDeliveryDetails } from 'u-next/amplify';
import { LocaleData } from 'u-next/locales';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useLocale } from '../context/LocaleContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AmplifyAuthResponse<T = any> = Promise<{
  data: T | null;
  errorCode: string;
  errorMessage: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResponse = (data: any) => {
  return {
    data: data ?? null,
    errorCode: '',
    errorMessage: '',
  };
};

const getErrorResponse = (args: {
  lang: LocaleData;
  key?: keyof typeof args.lang.messages;
  error: unknown;
}) => {
  const errorCode = args.error instanceof Error ? args.error.name : '';
  const messageList = args.key ? args.lang.messages[args.key] : [];
  const errorMessage =
    messageList[errorCode as keyof typeof messageList] ??
    args.lang.messages.default;

  return {
    data: null,
    errorCode,
    errorMessage,
  };
};

const useAmplifyAuth = () => {
  const { lang } = useLocale();

  const signIn = useCallback(
    (values: { loginId: string; password: string }): AmplifyAuthResponse => {
      return Auth.signIn(values.loginId, values.password)
        .then(getResponse)
        .catch((error) => getErrorResponse({ lang, key: 'authSignIn', error }));
    },
    [lang]
  );

  const signOut = useCallback((): AmplifyAuthResponse => {
    return Auth.signOut()
      .then(getResponse)
      .catch((error) => getErrorResponse({ lang, error }));
  }, [lang]);

  const signUp = useCallback(
    (values: {
      loginId: string;
      password: string;
      email: string;
    }): AmplifyAuthResponse<ISignUpResult> => {
      const params = {
        username: values.loginId,
        password: values.password,
        attributes: {
          email: values.email,
        },
      };

      return Auth.signUp(params)
        .then(getResponse)
        .catch((error) => getErrorResponse({ lang, key: 'authSignUp', error }));
    },
    [lang]
  );

  const verifyCurrentUserAttribute = useCallback(
    (values: { attr: 'email' }): AmplifyAuthResponse => {
      return Auth.verifyCurrentUserAttribute(values.attr)
        .then(getResponse)
        .catch((error) => getErrorResponse({ lang, error }));
    },
    [lang]
  );

  const currentAuthenticatedUser =
    useCallback((): AmplifyAuthResponse<CognitoUser> => {
      return Auth.currentAuthenticatedUser({ bypassCache: true })
        .then(getResponse)
        .catch((error) => getErrorResponse({ lang, error }));
    }, [lang]);

  const updateUserAttributes = useCallback(
    (values: { user: unknown; email: string }): AmplifyAuthResponse => {
      return Auth.updateUserAttributes(values.user, { email: values.email })
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({ lang, key: 'authUpdateUserAttributes', error })
        );
    },
    [lang]
  );

  const verifyCurrentUserAttributeSubmit = useCallback(
    (values: {
      attr: 'email';
      verificationCode: string;
    }): AmplifyAuthResponse => {
      return Auth.verifyCurrentUserAttributeSubmit(
        values.attr,
        values.verificationCode
      )
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({
            lang,
            key: 'authVerifyCurrentUserAttributeSubmit',
            error,
          })
        );
    },
    [lang]
  );

  const forgotPassword = useCallback(
    (values: { loginId: string }): AmplifyAuthResponse<CodeDeliveryDetails> => {
      return Auth.forgotPassword(values.loginId)
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({ lang, key: 'authForgotPassword', error })
        );
    },
    [lang]
  );

  const forgotPasswordSubmit = useCallback(
    (values: {
      loginId: string;
      verificationCode: string;
      newPassword: string;
    }): AmplifyAuthResponse => {
      return Auth.forgotPasswordSubmit(
        values.loginId,
        values.verificationCode,
        values.newPassword
      )
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({ lang, key: 'authForgotPasswordSubmit', error })
        );
    },
    [lang]
  );

  const resendSignUp = useCallback(
    (values: { loginId: string }): AmplifyAuthResponse => {
      return Auth.resendSignUp(values.loginId)
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({ lang, key: 'authResendSignUp', error })
        );
    },
    [lang]
  );

  const confirmSignUp = useCallback(
    (values: {
      loginId: string;
      verificationCode: string;
    }): AmplifyAuthResponse => {
      return Auth.confirmSignUp(values.loginId, values.verificationCode)
        .then(getResponse)
        .catch((error) =>
          getErrorResponse({ lang, key: 'authConfirmSignUp', error })
        );
    },
    [lang]
  );

  return {
    signIn,
    signOut,
    signUp,
    confirmSignUp,
    verifyCurrentUserAttribute,
    currentAuthenticatedUser,
    updateUserAttributes,
    verifyCurrentUserAttributeSubmit,
    forgotPassword,
    forgotPasswordSubmit,
    resendSignUp,
  };
};

export default useAmplifyAuth;
