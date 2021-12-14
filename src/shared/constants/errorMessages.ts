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
} as const;

export type ErrorCodeGetWabikenMeta = keyof typeof errorMessages.getWabikenMeta;
export type ErrorCodeActivateWabiken =
  keyof typeof errorMessages.activateWabiken;
