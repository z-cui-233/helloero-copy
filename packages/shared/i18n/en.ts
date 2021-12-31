import { LocaleData } from 'u-next/locales';

const lang: LocaleData = {
  error: {
    notFound: {
      title: 'Not Found',
      text: '入力したアドレスが間違っているか、ページが移動した可能性があります。',
      home: 'HOME',
    },
    unexpected: {
      title: '予期せぬエラーが発生しました',
      text: 'サーバへのアクセスが混み合っているか、メンテナンス中の可能性があります。しばらく時間をおいてから、もう一度アクセスしてください。',
      home: 'HOME',
    },
  },
  messages: {
    default: '予期せぬエラーが発生しました。もう一度お試しください。',
    getWabikenMeta: {
      400001: '入力したコードが正しいか、もう一度お確かめください',
      404000: '入力したコードが正しいか、もう一度お確かめください',
    },
    activateWabiken: {
      400001: '入力したコードが正しいか、もう一度お確かめください',
      404000: '入力したコードが正しいか、もう一度お確かめください',
      400102: 'この作品は配信終了しました',
      409002: 'This code is already in use.',
    },
    getPlayInfo: {
      400001: '予期せぬエラーが発生しました。もう一度お試しください。', // パラメーターエラー
      400102: 'この作品は視聴期限が過ぎました。', // wabikenの有効期間外（期限切れ、有効期間前）
      400103: '予期せぬエラーが発生しました。もう一度お試しください。', // リフレッシュトークンの期限が切れた
      400104: 'この作品は視聴回数が上限に達しました。', // 視聴可能回数は足りない
      400105:
        '入力したアドレスが間違っているか、ページが移動した可能性があります。', // wabikenまだアクティベートしません
      403002: '予期せぬエラーが発生しました。もう一度お試しください。', // wabikenは他人にロックされてる
      404000:
        '入力したアドレスが間違っているか、ページが移動した可能性があります。', // 存在しないwabiken
    },
    authSignUp: {
      UsernameExistsException: 'このログインIDは利用できません。',
      // ユーザープール内に既に同じ username が存在する場合に起こる。
      InvalidPasswordException: 'パスワードの形式・文字数が間違っています。',
      // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
      InvalidParameterException: '入力内容をお確かめください。',
      // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
      // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
    },
    authConfirmSignUp: {
      CodeMismatchException: '本人確認コードが間違っています。',
      // 無効なコードが入力された場合に起こる。
      LimitExceededException:
        '一定回数間違えたため、登録できません。しばらく時間をおいてから、再度お試しください。',
      // コードを間違え続けた場合に起こる。
      ExpiredCodeException:
        '本人確認コードの期限が切れました。もう一度最初からやり直してください。',
      // コードが期限切れ（24時間をオーバー）した場合に起こる。
      // 注) username が存在しない・無効化されている場合にも起こる。
      NotAuthorizedException:
        '既に登録済みです。ログイン画面からログインしてください。',
      // 既にステータスが CONFIRMED になっている場合に起こる。
      CodeDeliveryFailureException:
        '予期せぬエラーが発生しました。もう一度お試しください。',
      // 検証コードの送信に失敗した場合に起こる。
    },
    authResendSignUp: {
      CodeDeliveryFailureException:
        '予期せぬエラーが発生しました。もう一度お試しください。',
      // 検証コードの送信に失敗した場合に起こる。
      InvalidParameterException:
        'ログイン画面からログインして利用してください。',
      // 既にステータスが CONFIRMED になっている場合に起こる。
      UserNotFoundException: 'ログインIDが正しいかご確認下さい。',
      // username が存在しない・無効化されている場合に起こる。
    },
    authSignIn: {
      UserNotConfirmedException: 'このアカウントはまだ登録が完了していません。',
      // ユーザのステータスが UNCONFIRMED の場合に起こる。
      // SignUp用のコードを再送し、ステータスを CONFIRMED にする必要がある。
      // 検証コードの再送は １．３節の ResendConfirmationCode() を参照。
      PasswordResetRequiredException:
        'このアカウントはパスワードリセットされています。パスワードを再設定してください。',
      // Cognito コンソールでパスワードをリセット（ユーザープールにユーザをインポートする場合も含む）した場合に起こる。
      // パスワードをリセットする必要がある。
      // パスワードのリセットは 3.1節の SendForgotPasswordCode() 参照。
      NotAuthorizedException: 'ログインID、パスワードが正しいかご確認下さい。',
      // 誤ったパスワードを入力した場合に起こる。
      // 注) パスワードを間違え続けた場合にも起こり、 error.message が 'Password attempts exceeded' になる。
      // （エラーコードとして LimitExceededException が返ってくると思ったらそうではなかった）
      UserNotFoundException: 'ログインID、パスワードが正しいかご確認下さい。',
      // PASSWORD_VERIFIER は通るものの username が Cognito ユーザープールに存在しない場合に起こる。
      InvalidParameterException:
        'ログインID、パスワードが正しいかご確認下さい。',
      // 入力された username や password が Cognito 側で正しくパースできないとき（バリデーションエラー）に起こる。
      // 注) 2019/04/24 現在、Cognito コンソールでパスワードをリセットした場合は 'PasswordResetRequiredException' ではなくこのエラーコードが返される。
    },
    authForgotPassword: {
      UserNotFoundException: 'ログインIDが正しいかご確認下さい。', // そんなログインIDは、いない
      LimitExceededException:
        '一定回数間違えたため、変更できません。しばらく時間をおいてから、再度お試しください。', // コード間違いの回数オーバー
    },
    authForgotPasswordSubmit: {
      CodeMismatchException: '本人確認コードが間違っています。', // 無効なコードが入力された場合に起こる。
      LimitExceededException:
        '一定回数間違えたため、変更できません。しばらく時間をおいてから、再度お試しください。', // コードを間違え続けた場合に起こる。
      ExpiredCodeException:
        '本人確認コードの期限が切れました。もう一度最初からやり直してください。', // コードが期限切れ（1時間をオーバー）した場合に起こる。
      InvalidPasswordException: 'パスワードの形式・文字数が間違っています。', // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
      InvalidParameterException:
        'パスワードに利用できない文字があるか、形式が間違っています。', // password が6文字未満など Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
    },
    authUpdateUserAttributes: {
      InvalidParameterException:
        '予期せぬエラーが発生しました。もう一度お試しください。', // phone_number が E.164 number convention でないなど各属性が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
      CodeDeliveryFailureException:
        '予期せぬエラーが発生しました。もう一度お試しください。', // 検証コードの送信に失敗した場合に起こる。
    },
    authVerifyCurrentUserAttributeSubmit: {
      CodeMismatchException: '本人確認コードが間違っています。', // 無効なコードが入力された場合に起こる。
      LimitExceededException:
        '一定回数間違えたため、変更できません。しばらく時間をおいてから、再度お試しください。', // コードを間違え続けた場合に起こる。
      ExpiredCodeException:
        '本人確認コードの期限が切れました。もう一度最初からやり直してください。', // コードが期限切れ（24時間をオーバー）した場合に起こる。
      NotAuthorizedException:
        '予期せぬエラーが発生しました。もう一度お試しください。', // ユーザーが無効化された場合に起こる。
      UserNotFoundException:
        '予期せぬエラーが発生しました。もう一度お試しください。', // ユーザーがユーザープールに存在しない場合に起こる。
    },
  },
  account: {
    meta: {
      default: {
        title: 'H2U Account',
        description: 'H2U アカウントの登録、ログイン、各種設定を行えます。',
      },
      login: {
        title: 'LogIn - H2U Account',
        description: '',
      },
      signUp: {
        title: 'SignUp - H2U Account',
        description: '',
      },
      resendSignUp: {
        title: 'SignUp - H2U Account',
        description: '',
      },
      logout: {
        title: 'Logout - H2U Account',
        description: '',
      },
      updateEmail: {
        title: 'Update Email - H2U Account',
        description: '',
      },
      resetPassword: {
        title: 'Change Password - H2U Account',
        description: '',
      },
    },
    menus: {
      login: 'Login',
      helloero: 'HELLOERO',
      account: 'Account',
      help: 'Help',
    },
    top: {
      service: {
        title: 'Services',
        helloero: 'シンプルに、カジュアルに。アダルトコンテンツを楽しもう。',
      },
      menus: {
        title: 'Account',
        login: 'Login',
        updateEmail: 'メールアドレスの変更',
        resetPassword: 'パスワードの変更',
        logout: 'ログアウト',
        help: 'ヘルプ',
      },
    },
    login: {
      title: 'H2Uにログイン',
      input: {
        button: 'ログイン',
        resetPassword: 'パスワードを忘れた方',
        signUp: 'H2Uアカウントを無料で登録',
      },
      passwordResetRequired: {
        text: 'ログインができません。このアカウントはパスワードリセットされています。パスワードを再設定してください。',
        button: 'パスワードの変更',
      },
      notConfirmed: {
        text: 'H2Uアカウントの登録が完了していません。メールアドレスの確認をしてアカウント登録を完了してください。',
        button: 'メールアドレスの確認',
      },
    },

    signUp: {
      title: 'H2Uアカウントの登録',
      step1: {
        text: 'お客様情報を入力してください',
        terms: {
          title:
            '登録ボタンを押すことにより、下記の規約に同意するものとします。',
          privacy: '個人情報の取扱いについて',
          service: '利用規約',
        },
        button: '規約に同意して登録',
      },
      step2: {
        text: 'メールアドレスの確認を行います。メールアドレスに送信した本人確認コードを入力してください。',
        button: '送信',
      },
      step3: {
        text: '登録が完了しました',
        button: 'ホーム',
      },
    },

    resendSignUp: {
      title: 'H2Uアカウント登録の再開',
      step1: {
        text: 'ログインIDを入力して、ご登録のメールアドレスに本人確認コードを送信してください。',
        button: '本人確認コードを送信',
      },
      step2: {
        text: 'メールアドレスに送信した本人確認コードを入力してください。',
        button: '本人確認コードを認証',
      },
      step3: {
        text: 'パスワードを入力して、ログインしてください',
        button: 'ログイン',
      },
      step4: {
        text: 'H2Uアカウントの登録が完了しました',
        button: 'ホーム',
      },
    },

    logout: {
      title: 'ログアウト',
      text: 'H2Uからログアウトしますか？再度ログインするには、ログインIDとパスワードが必要です。',
      button: 'LOG OUT',
      cancel: 'CANCEL',
    },
    updateEmail: {
      title: 'メールアドレスの変更',
      email: {
        text: 'ご希望のメールアドレスを入力して、本人確認コードを送信してください。',
        button: '本人確認コードを送信',
      },
      verification: {
        text: 'メールアドレスに送信した本人確認コードを入力してください。',
        button: '本人確認コードを認証',
      },
      complete: {
        text: '変更が完了しました。',
        home: 'HOME',
      },
    },
    resetPassword: {
      title: 'パスワードの変更',
      send: {
        text: 'パスワードを変更するには、本人確認が必要です。ご登録のメールアドレスに確認メールを送信します。',
        button: '本人確認メールを送信',
      },
      input: {
        text: '下記のメールアドレスに送信した本人確認コードと、ご希望のパスワードを入力してください。',
        button: 'パスワードを変更',
      },
      complete: {
        text: '変更が完了しました',
        home: 'ホーム',
      },
    },
  },
  helloero: {
    meta: {
      default: {
        title: 'HELLOERO powered by H2U',
        description:
          'シンプルに、カジュアルに。アダルトコンテンツを楽しもう。ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。',
      },
      entry: {
        title: 'コード入力 - HELLOERO powered by H2U',
        description: '',
      },
    },
    menus: {
      login: 'Login',
      account: 'Account',
      help: 'Help',
    },
    top: {
      lead: 'シンプルに、カジュアルに。アダルトコンテンツを楽しもう。',
      description:
        'ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。はじめてご利用の方はアカウント登録からお願いします。',
      button: 'Login / SignUp',
    },
    myLibrary: {
      wabiken: {
        entry: '購入したシリアルコードの登録',
        store: 'ストアに行く',
      },
      filter: {
        search: 'Search Title Name',
      },
      purchased: {
        title: '購入済み作品',
        detail: 'DETAIL',
        watch: 'PLAY',
      },
    },
    entry: {
      title: 'シリアルコードの登録',
      input: {
        text: '購入時に受け取った、シリアルコードを入力してください。',
        button: 'シリアルコードを確認',
      },
      confirm: {
        text: '内容を確認の上、登録をして下さい。',
        button: '動画を登録',
      },
      complete: {
        text: '動画を登録しました。有効期限がある場合、作品詳細でも確認できます。',
        home: 'ホーム',
      },
    },
  },
  help: {
    meta: {
      default: {
        title: 'H2U Help Center',
        description:
          'H2Uのヘルプセンターです。ヘルプページをお探しの方はこちらをご覧ください。',
      },
      info: {
        title: 'お知らせ - H2U ヘルプセンター',
        description: '',
      },
      infoDetail: {
        title: ' - お知らせ - H2U ヘルプセンター',
        description: '',
      },
      guide: {
        title: 'よくある質問 - H2U ヘルプセンター',
        description: '',
      },
      guideCategory: {
        title: ' - よくある質問 - H2U ヘルプセンター',
        description: '',
      },
      guideDetail: {
        title: ' - よくある質問 - H2U ヘルプセンター',
        description: '',
      },
      termsPrivacy: {
        title: 'プライバシーポリシー - H2U ヘルプセンター',
        description: '',
      },
      termsService: {
        title: 'サービス規約 - H2U ヘルプセンター',
        description: '',
      },
      inquiry: {
        title: 'お問い合わせ - H2U ヘルプセンター',
        description: '',
      },
    },
    top: {
      title: 'ヘルプセンター',
      guide: {
        title: 'よくある質問',
        text: 'H2U、HELLOEROについて、使い方やご質問、ご不明な点を確認できます。',
      },
      info: {
        title: 'お知らせ',
        text: 'H2Uからのお知らせを確認できます。',
      },
      inquiry: {
        title: 'お問い合わせ',
        text: '「よくある質問」で解決しない問題についてお問い合わせください。',
      },
    },
    info: {
      title: 'お知らせ',
    },
    guide: {
      title: 'よくある質問',
    },
    termsPrivacy: {
      title: 'プライバシーポリシー',
    },
    termsService: {
      title: 'サービス規約',
    },
    inquiry: {
      title: 'お問い合わせ',
    },
  },
};

export default lang;
