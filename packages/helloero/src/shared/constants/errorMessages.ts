export const errorMessages = {
  default: '予期せぬエラーが発生しました。もう一度お試しください。',
  getWabikenMeta: {
    400001: '入力したコードが正しいか、もう一度お確かめください',
    404000: '入力したコードが正しいか、もう一度お確かめください',
  },
  activateWabiken: {
    400001: '入力したコードが正しいか、もう一度お確かめください',
    404000: '入力したコードが正しいか、もう一度お確かめください',
    400102: 'この作品は配信終了しました',
    409002: 'このコードは既に利用済みです',
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
} as const;

export type ErrorCodeGetWabikenMeta = keyof typeof errorMessages.getWabikenMeta;

export type ErrorCodeActivateWabiken =
  keyof typeof errorMessages.activateWabiken;

export type ErrorCodeGetPlayInfo = keyof typeof errorMessages.getPlayInfo;
