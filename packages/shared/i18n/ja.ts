import { LocaleData } from 'u-next/locales';

const lang: LocaleData = {
  error: {
    notFound: {
      title: 'お探しのページが見つかりません',
      text: '入力したアドレスが間違っているか、ページが移動した可能性があります。',
      home: 'ホーム',
    },
    unexpected: {
      title: '予期せぬエラーが発生しました',
      text: 'サーバへのアクセスが混み合っているか、メンテナンス中の可能性があります。しばらく時間をおいてから、もう一度アクセスしてください。',
      home: 'ホーム',
    },
  },
  messages: {
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
    authForgotPasswordSubmit: {
      CodeMismatchException: '本人確認コードが間違っています。', // 本人確認コードが間違い
      InvalidParameterException:
        'パスワードに利用できない文字があるか、形式が間違っています。', // パスワード形式がNG
    },
  },
  account: {
    meta: {
      default: {
        title: 'H2U アカウント',
        description: 'H2U アカウントの登録、ログイン、各種設定を行えます。',
      },
      login: {
        title: 'ログイン - H2U アカウント',
        description: '',
      },
      logout: {
        title: 'ログアウト - H2U アカウント',
        description: '',
      },
      updateEmail: {
        title: 'メールアドレスの変更 - H2U アカウント',
        description: '',
      },
      resetPassword: {
        title: 'パスワードの変更 - H2U アカウント',
        description: '',
      },
    },
    menus: {
      login: 'ログイン/登録',
      helloero: 'HELLOERO',
      account: 'アカウント設定',
      help: 'ヘルプ',
      logout: 'ログアウト',
    },
    logout: {
      title: 'H2Uからログアウトしますか？',
      text: '再度ログインするには、ログインIDとパスワードが必要です。',
      button: 'ログアウト',
      cancel: 'キャンセル',
    },
    updateEmail: {
      email: {
        title: 'メールアドレスの変更',
        text: 'ご希望のメールアドレスを入力して、本人確認コードを送信してください。',
        email: '新しいメールアドレス',
        button: '本人確認コードを送信',
      },
      verification: {
        title: 'メールアドレスの変更',
        text: 'メールアドレスに送信した本人確認コードを入力してください。',
        code: '本人確認コード',
        button: '本人確認コードを認証',
      },
      complete: {
        title: '変更が完了しました',
        text: 'メールアドレスの変更が完了しました。',
        home: 'ホーム',
      },
    },
    resetPassword: {
      send: {
        title: 'パスワードの変更',
        text: 'パスワードを変更するには、本人確認が必要です。下記のメールアドレスに本人確認メールを送信してください。',
        button: 'このアドレスに送信',
      },
      input: {
        title: 'パスワードの変更',
        text: '下記のメールアドレスに送信した本人確認コードと、ご希望のパスワードを入力してください。',
        verificationCode: '本人確認コード',
        newPassword: '新しいパスワード',
        button: 'パスワードを変更',
      },
      complete: {
        title: '変更が完了しました',
        text: 'パスワードの変更が完了しました。',
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
      settings: '設定',
      login: 'ログイン/登録',
      logout: 'ログアウト',
      account: 'アカウント設定',
      help: 'ヘルプ',
      helpcenter: 'ヘルプセンター',
      terms: '利用規約',
      support: 'お問い合わせ',
    },
    top: {
      lead: 'シンプルに、カジュアルに。アダルトコンテンツを楽しもう。',
      description:
        'ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。はじめてご利用の方はアカウント登録からお願いします。',
      button: 'ログイン/アカウント登録',
    },
    myLibrary: {
      wabiken: {
        title: '購入した動画の登録',
        entry: 'シリアルコードの登録',
        store: 'ストアに行く',
      },
      filter: {
        search: 'タイトル名で検索',
      },
      purchased: {
        title: '購入済み',
        detail: '詳細を見る',
        watch: 'この動画を再生',
      },
    },
    entry: {
      input: {
        title: '購入した動画の登録',
        text: '購入時に受け取った、シリアルコードを入力してください。',
        serial: 'シリアルコード',
        button: 'シリアルコードを確認',
      },
      confirm: {
        title: '購入した動画の登録',
        text: '内容を確認の上、登録をして下さい。',
        button: '動画を登録',
      },
      complete: {
        title: '動画を登録しました',
        text: '引き続き、HELLOEROをお楽しみ下さい。有効期限がある場合、作品詳細でも確認できます。',
        home: 'ホーム',
      },
    },
  },
  help: {
    meta: {
      default: {
        title: 'H2U ヘルプセンター',
        description:
          'H2Uのヘルプセンターです。ヘルプページをお探しの方はこちらをご覧ください。',
      },
    },
  },
};

export default lang;
