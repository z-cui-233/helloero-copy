const formLabels = {
  verificationCode: {
    label: '本人確認コード',
    placeholder: '例）123456',
  },
  email: {
    label: 'メールアドレス',
    placeholder: '',
  },
  loginId: {
    label: 'ログインID',
    placeholder: '6桁以上の半角英数字',
  },
  password: {
    label: 'パスワード',
    placeholder: '8桁以上の半角英数字',
  },
  newPassword: {
    label: '新しいパスワード',
    placeholder: '8桁以上の半角英数字',
  },
  wabiken: {
    label: 'シリアルコード',
    placeholder: '16桁の英数字（ハイフン無し）',
  },
} as const;

export default formLabels;
