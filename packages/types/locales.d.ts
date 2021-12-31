export type LocaleType = 'ja' | 'en';

export interface LocaleData {
  error: {
    notFound: {
      title: string;
      text: string;
      home: string;
    };
    unexpected: {
      title: string;
      text: string;
      home: string;
    };
  };
  messages: {
    default: string;
    getWabikenMeta: {
      400001: string;
      404000: string;
    };
    activateWabiken: {
      400001: string;
      404000: string;
      400102: string;
      409002: string;
    };
    getPlayInfo: {
      400001: string; // パラメーターエラー
      400102: string; // wabikenの有効期間外（期限切れ、有効期間前）
      400103: string; // リフレッシュトークンの期限が切れた
      400104: string; // 視聴可能回数は足りない
      400105: string; // wabikenまだアクティベートしません
      403002: string; // wabikenは他人にロックされてる
      404000: string; // 存在しないwabiken
    };
    authSignUp: {
      UsernameExistsException: string;
      // ユーザープール内に既に同じ username が存在する場合に起こる。
      InvalidPasswordException: string;
      // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
      InvalidParameterException: string;
      // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
      // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
    };
    authConfirmSignUp: {
      CodeMismatchException: string;
      // 無効なコードが入力された場合に起こる。
      LimitExceededException: string;
      // コードを間違え続けた場合に起こる。
      ExpiredCodeException: string;
      // コードが期限切れ（24時間をオーバー）した場合に起こる。
      // 注) username が存在しない・無効化されている場合にも起こる。
      NotAuthorizedException: string;
      // 既にステータスが CONFIRMED になっている場合に起こる。
      CodeDeliveryFailureException: string;
      // 検証コードの送信に失敗した場合に起こる。
    };
    authResendSignUp: {
      CodeDeliveryFailureException: string;
      // 検証コードの送信に失敗した場合に起こる。
      InvalidParameterException: string;
      // 既にステータスが CONFIRMED になっている場合に起こる。
      UserNotFoundException: string;
      // username が存在しない・無効化されている場合に起こる。
    };
    authSignIn: {
      UserNotConfirmedException: string;
      // ユーザのステータスが UNCONFIRMED の場合に起こる。
      // SignUp用のコードを再送し、ステータスを CONFIRMED にする必要がある。
      // 検証コードの再送は １．３節の ResendConfirmationCode() を参照。
      PasswordResetRequiredException: string;
      // Cognito コンソールでパスワードをリセット（ユーザープールにユーザをインポートする場合も含む）した場合に起こる。
      // パスワードをリセットする必要がある。
      // パスワードのリセットは 3.1節の SendForgotPasswordCode() 参照。
      NotAuthorizedException: string;
      // 誤ったパスワードを入力した場合に起こる。
      // 注) パスワードを間違え続けた場合にも起こり、 error.message が 'Password attempts exceeded' になる。
      // （エラーコードとして LimitExceededException が返ってくると思ったらそうではなかった）
      UserNotFoundException: string;
      // PASSWORD_VERIFIER は通るものの username が Cognito ユーザープールに存在しない場合に起こる。
      InvalidParameterException: string;
      // 入力された username や password が Cognito 側で正しくパースできないとき（バリデーションエラー）に起こる。
      // 注) 2019/04/24 現在、Cognito コンソールでパスワードをリセットした場合は 'PasswordResetRequiredException' ではなくこのエラーコードが返される。
    };
    authForgotPassword: {
      UserNotFoundException: string; // そんなログインIDは、いない
      LimitExceededException: string; // コード間違いの回数オーバー
    };
    authForgotPasswordSubmit: {
      CodeMismatchException: string; // 無効なコードが入力された場合に起こる。
      LimitExceededException: string; // コードを間違え続けた場合に起こる。
      ExpiredCodeException: string; // コードが期限切れ（1時間をオーバー）した場合に起こる。
      InvalidPasswordException: string; // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
      InvalidParameterException: string; // password が6文字未満など Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
    };
    authUpdateUserAttributes: {
      InvalidParameterException: string; // phone_number が E.164 number convention でないなど各属性が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
      CodeDeliveryFailureException: string; // 検証コードの送信に失敗した場合に起こる。
    };
    authVerifyCurrentUserAttributeSubmit: {
      CodeMismatchException: string; // 無効なコードが入力された場合に起こる。
      LimitExceededException: string; // コードを間違え続けた場合に起こる。
      ExpiredCodeException: string; // コードが期限切れ（24時間をオーバー）した場合に起こる。
      NotAuthorizedException: string; // ユーザーが無効化された場合に起こる。
      UserNotFoundException: string; // ユーザーがユーザープールに存在しない場合に起こる。
    };
  };
  account: {
    meta: {
      default: {
        title: string;
        description: string;
      };
      login: {
        title: string;
        description: string;
      };
      signUp: {
        title: string;
        description: string;
      };
      resendSignUp: {
        title: string;
        description: string;
      };
      logout: {
        title: string;
        description: string;
      };
      updateEmail: {
        title: string;
        description: string;
      };
      resetPassword: {
        title: string;
        description: string;
      };
    };
    menus: {
      login: string;
      helloero: string;
      account: string;
      help: string;
    };
    top: {
      service: {
        title: string;
        helloero: string;
      };
      menus: {
        title: string;
        login: string;
        updateEmail: string;
        resetPassword: string;
        logout: string;
        help: string;
      };
    };
    login: {
      title: string;
      input: {
        button: string;
        resetPassword: string;
        signUp: string;
      };
      passwordResetRequired: {
        text: string;
        button: string;
      };
      notConfirmed: {
        text: string;
        button: string;
      };
    };

    signUp: {
      title: string;
      step1: {
        text: string;
        terms: {
          title: string;
          privacy: string;
          service: string;
        };
        button: string;
      };
      step2: {
        text: string;
        button: string;
      };
      step3: {
        text: string;
        button: string;
      };
    };

    resendSignUp: {
      title: string;
      step1: {
        text: string;
        button: string;
      };
      step2: {
        text: string;
        button: string;
      };
      step3: {
        text: string;
        button: string;
      };
      step4: {
        text: string;
        button: string;
      };
    };

    logout: {
      title: string;
      text: string;
      button: string;
      cancel: string;
    };
    updateEmail: {
      title: string;
      email: {
        text: string;
        button: string;
      };
      verification: {
        text: string;
        button: string;
      };
      complete: {
        text: string;
        home: string;
      };
    };
    resetPassword: {
      title: string;
      send: {
        text: string;
        button: string;
      };
      input: {
        text: string;
        button: string;
      };
      complete: {
        text: string;
        home: string;
      };
    };
  };
  helloero: {
    meta: {
      default: {
        title: string;
        description: string;
      };
      entry: {
        title: string;
        description: string;
      };
    };
    menus: {
      login: string;
      account: string;
      help: string;
    };
    top: {
      lead: string;
      description: string;
      button: string;
    };
    myLibrary: {
      wabiken: {
        entry: string;
        store: string;
      };
      filter: {
        search: string;
      };
      purchased: {
        title: string;
        detail: string;
        watch: string;
      };
    };
    entry: {
      title: string;
      input: {
        text: string;
        button: string;
      };
      confirm: {
        text: string;
        button: string;
      };
      complete: {
        text: string;
        home: string;
      };
    };
  };
  help: {
    meta: {
      default: {
        title: string;
        description: string;
      };
      info: {
        title: string;
        description: string;
      };
      infoDetail: {
        title: string;
        description: string;
      };
      guide: {
        title: string;
        description: string;
      };
      guideCategory: {
        title: string;
        description: string;
      };
      guideDetail: {
        title: string;
        description: string;
      };
      termsPrivacy: {
        title: string;
        description: string;
      };
      termsService: {
        title: string;
        description: string;
      };
      inquiry: {
        title: string;
        description: string;
      };
    };
    top: {
      title: string;
      guide: {
        title: string;
        text: string;
      };
      info: {
        title: string;
        text: string;
      };
      inquiry: {
        title: string;
        text: string;
      };
    };
    info: {
      title: string;
    };
    guide: {
      title: string;
    };
    termsPrivacy: {
      title: string;
    };
    termsService: {
      title: string;
    };
    inquiry: {
      title: string;
    };
  };
}
