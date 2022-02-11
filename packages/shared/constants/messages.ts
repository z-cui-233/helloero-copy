export const MESSAGES = {
  default: '予期せぬエラーが発生しました。もう一度お試しください。',
  getWabikenMeta: {
    400001: '入力したコードが正しいか、もう一度お確かめください。',
    404000: '入力したコードが正しいか、もう一度お確かめください。',
  },
  activateWabiken: {
    400001: '入力したコードが正しいか、もう一度お確かめください。',
    404000: '入力したコードが正しいか、もう一度お確かめください。',
    400102: 'この作品は配信終了しました。',
    409002: 'このコードは既に利用済みです。',
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
    InvalidParameterException: 'ログイン画面からログインして利用してください。',
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
    InvalidParameterException: 'ログインID、パスワードが正しいかご確認下さい。',
    // 入力された username や password が Cognito 側で正しくパースできないとき（バリデーションエラー）に起こる。
    // 注) 2019/04/24 現在、Cognito コンソールでパスワードをリセットした場合は 'PasswordResetRequiredException' ではなくこのエラーコードが返される。
  },
  authForgotPassword: {
    UserNotFoundException: 'ログインIDが正しいかご確認下さい。', // そんなログインIDは、いない
    LimitExceededException:
      '一定回数を超えたため変更できません。しばらく時間をおいてから、再度お試しください。', // PWを変更しすぎてLockされた
    InvalidParameterException:
      'メールアドレスの確認が完了していません。先にメールアドレスを再登録してください。', // メールがまだ認証されていないのでメール送信できない
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
} as const;

export type MessageKeys = keyof typeof MESSAGES;
