import { LocaleType } from 'u-next/locales';

type FormLabels = {
  [key in
    | 'verificationCode'
    | 'email'
    | 'loginId'
    | 'password'
    | 'newPassword'
    | 'wabiken']: {
    label: {
      [key in LocaleType]: string;
    };
    placeholder: {
      [key in LocaleType]: string;
    };
  };
};

const formLabels: FormLabels = {
  verificationCode: {
    label: {
      ja: '本人確認コード',
      en: 'verification code',
    },
    placeholder: {
      ja: '例）123456',
      en: 'e.g. 123456',
    },
  },
  email: {
    label: {
      ja: 'メールアドレス',
      en: 'Email',
    },
    placeholder: {
      ja: '',
      en: '',
    },
  },
  loginId: {
    label: {
      ja: 'ログインID',
      en: 'login id',
    },
    placeholder: {
      ja: '6桁以上の半角英数字',
      en: '6桁以上の半角英数字',
    },
  },
  password: {
    label: {
      ja: 'パスワード',
      en: 'password',
    },
    placeholder: {
      ja: '8桁以上の半角英数字',
      en: '8桁以上の半角英数字',
    },
  },
  newPassword: {
    label: {
      ja: '新しいパスワード',
      en: 'new password',
    },
    placeholder: {
      ja: '8桁以上の半角英数字',
      en: '8桁以上の半角英数字',
    },
  },
  wabiken: {
    label: {
      ja: 'シリアルコード',
      en: 'serial code',
    },
    placeholder: {
      ja: '16桁の英数字（ハイフン無し）',
      en: '16桁の英数字（ハイフン無し）',
    },
  },
};

export default formLabels;
