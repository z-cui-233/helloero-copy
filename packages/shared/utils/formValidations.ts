import * as Yup from 'yup';

const validationMessages = {
  required: '入力必須です',
  email: 'メールアドレスを入力してください',
  min6: '6文字以上で入力してください',
  min8: '8文字以上で入力してください',
  length16: '16文字で入力してください',
  alphanumerical: '半角英数字で入力してください',
  alphanumericalKigo: '半角英数字記号で入力してください',
  alphanumericalKigoRequired: '英数字両方を含む必要があります',
  numerical: '半角数字で入力してください',
} as const;

const formValidations = {
  verificationCode: Yup.string()
    .required(validationMessages['required'])
    .matches(/^[0-9]*$/, validationMessages['numerical']),

  loginId: Yup.string()
    .required(validationMessages['required'])
    .matches(
      /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
      validationMessages['alphanumericalKigo']
    )
    .min(6, validationMessages['min6']),

  password: Yup.string()
    .required(validationMessages['required'])
    .matches(
      /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
      validationMessages['alphanumericalKigo']
    )
    .min(8, validationMessages['min8']),

  passwordRegister: Yup.string()
    .required(validationMessages['required'])
    .matches(
      /^(?=.*[A-Z|a-z])(?=.*[0-9])[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
      validationMessages['alphanumericalKigoRequired']
    )
    .min(8, validationMessages['min8']),

  email: Yup.string()
    .required(validationMessages['required'])
    .email(validationMessages['email']),

  optEmail: Yup.string().email(validationMessages['email']),

  wabiken: Yup.string()
    .required(validationMessages['required'])
    .matches(/^[0-9a-zA-Z]*$/, validationMessages['alphanumerical'])
    .length(16, validationMessages['length16']),

  required: Yup.string().required(validationMessages['required']),
};

export default formValidations;
