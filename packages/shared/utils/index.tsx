import { LocaleData } from 'u-next/locales';

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
  code: number | undefined
): string => {
  const messageList = lang.messages[key];
  return messageList[code as keyof typeof messageList] ?? lang.messages.default;
};
