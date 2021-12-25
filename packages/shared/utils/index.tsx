import dateFormat from 'dateformat';
import { FormikProps } from 'formik';
import { LocaleData } from 'u-next/locales';
import { localeType } from '../context/LocaleContext';

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
  local: localeType,
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

export const getFormikFieldOptions = (
  formik: FormikProps<any>,
  name: string,
  type = 'text'
): any => {
  return {
    type,
    name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
    isError: !!formik.touched[name] && !!formik.errors[name],
  };
};

export const getFormikErrorMessage = (
  formik: FormikProps<any>,
  name: string
): string => {
  return formik.touched[name] && formik.errors[name]
    ? (formik.errors[name] as string)
    : '';
};
