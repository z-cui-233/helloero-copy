import dateFormat from 'dateformat';
import { LocaleData, LocaleType } from 'u-next/locales';

export const createTitleThumbnailUrl = (
  url: string | undefined | null
): string => {
  if (!url) {
    return '';
  }

  const query =
    '?output-quality=80&output-format=jpg&downsize=400px:*&letterbox=5:7&bgblur=50,0.5';
  const protocol = url.indexOf('http') !== -1 ? '' : 'https://';

  return `${protocol}${url}${query}`;
};

export const getErrorMessage = (
  lang: LocaleData,
  key: keyof typeof lang.messages,
  code: number | string | undefined
): string => {
  const messageList = lang.messages[key];
  const errorMessage =
    messageList[code as keyof typeof messageList] ?? lang.messages.default;

  return errorMessage;
};

export const createExpireDate = (
  local: LocaleType,
  validityPeriod: number | undefined,
  notValidAfter?: number
): string => {
  // 0sec = EST. we should not show expireDate
  if (!validityPeriod || validityPeriod === 0) {
    return local === 'ja' ? '無期限で視聴可能' : 'Watch no expiration';
  }

  const referenceDate = notValidAfter ? new Date(0) : new Date();
  referenceDate.setSeconds(notValidAfter ? notValidAfter : validityPeriod);

  return local === 'ja'
    ? `${dateFormat(referenceDate, 'yyyy年m月d日 HH:MM')}まで視聴可能`
    : `Watch until ${dateFormat(referenceDate, 'mmm dd, yyyy HH:MM')} JST`;
};

export const convertDateToString = (
  local: LocaleType,
  date: Date | null
): string => {
  if (!date) {
    return '';
  }

  return local === 'ja'
    ? dateFormat(date, 'yyyy年m月d日')
    : dateFormat(date, 'mmm dd, yyyy');
};
