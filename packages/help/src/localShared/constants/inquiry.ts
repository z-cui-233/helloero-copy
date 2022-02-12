const INQUIRY_TYPES = {
  start: '利用を開始する方法',
  login: 'ログインできない',
  serialCode: 'シリアルコードの使い方',
  devices: '視聴可能デバイス',
  play: '再生方法・トラブル',
  other: 'その他',
} as const;

export type InquiryTypeKeys = keyof typeof INQUIRY_TYPES;

export const INQUIRY_TYPE_MAP = new Map<InquiryTypeKeys, string>([
  ['start', INQUIRY_TYPES.start],
  ['login', INQUIRY_TYPES.login],
  ['serialCode', INQUIRY_TYPES.serialCode],
  ['devices', INQUIRY_TYPES.devices],
  ['play', INQUIRY_TYPES.play],
  ['other', INQUIRY_TYPES.other],
]);
