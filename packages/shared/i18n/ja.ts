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
  account: {
    logout: {
      title: 'H2Uからログアウトしますか？',
      text: '再度ログインするには、ログインIDとパスワードが必要です。',
      button: 'ログアウト',
      cancel: 'キャンセル',
    },
  },
  helloero: {
    menus: {
      settings: '設定',
      login: 'ログイン/アカウント登録',
      logout: 'ログアウト',
      help: 'ヘルプ',
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
};

export default lang;
