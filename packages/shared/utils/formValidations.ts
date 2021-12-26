import { LocaleType } from 'u-next/locales';
import * as Yup from 'yup';

type ValidationMessages = {
  [key in
    | 'required'
    | 'email'
    | 'min8'
    | 'length16'
    | 'alphanumerical'
    | 'numerical']: {
    [key in LocaleType]: string;
  };
};

const validationMessages: ValidationMessages = {
  required: {
    ja: '入力必須です',
    en: 'Required',
  },
  email: {
    ja: 'メールアドレスを入力してください',
    en: 'メールアドレスを入力してください',
  },
  min8: {
    ja: '8文字以上で入力してください',
    en: '8文字以上で入力してください',
  },
  length16: {
    ja: '16文字で入力してください',
    en: '16文字で入力してください',
  },
  alphanumerical: {
    ja: '半角英数字で入力してください',
    en: '半角英数字で入力してください',
  },
  numerical: {
    ja: '半角数字で入力してください',
    en: '半角数字で入力してください',
  },
};

const formValidations = {
  verificationCode: (locale: LocaleType) =>
    Yup.string()
      .required(validationMessages['required'][locale])
      .matches(/^[0-9]/, validationMessages['numerical'][locale]),

  loginId: (locale: LocaleType) =>
    Yup.string()
      .required(validationMessages['required'][locale])
      .matches(/^[0-9a-zA-Z]/, validationMessages['alphanumerical'][locale]),

  password: (locale: LocaleType) =>
    Yup.string()
      .required(validationMessages['required'][locale])
      .matches(/^[0-9a-zA-Z]/, validationMessages['alphanumerical'][locale])
      .min(8, validationMessages['min8'][locale]),

  email: (locale: LocaleType) =>
    Yup.string()
      .required(validationMessages['required'][locale])
      .email(validationMessages['email'][locale]),

  wabiken: (locale: LocaleType) =>
    Yup.string()
      .required(validationMessages['required'][locale])
      .matches(/^[0-9a-zA-Z]/, validationMessages['alphanumerical'][locale])
      .length(16, validationMessages['length16'][locale]),
};

export default formValidations;
