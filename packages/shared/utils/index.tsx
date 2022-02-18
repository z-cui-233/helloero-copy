import dateFormat from 'dateformat';
import { MessageKeys, MESSAGES } from '../constants/messages';

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
  key: MessageKeys,
  code: number | string | undefined
): string => {
  const messageList = MESSAGES[key];
  const errorMessage =
    messageList[code as keyof typeof messageList] ?? MESSAGES.default;

  return errorMessage;
};

export const createExpireDate = (
  validityPeriod: number | undefined,
  notValidAfter?: number
): string => {
  // 0sec = EST. we should not show expireDate
  if (!validityPeriod || validityPeriod === 0) {
    return '無期限で視聴可能';
  }

  const referenceDate = notValidAfter ? new Date(0) : new Date();
  referenceDate.setSeconds(notValidAfter ? notValidAfter : validityPeriod);

  return `${dateFormat(referenceDate, 'yyyy年m月d日 HH:MM')}まで視聴可能`;
};

export const convertDateToString = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  return dateFormat(date, 'yyyy年m月d日');
};
