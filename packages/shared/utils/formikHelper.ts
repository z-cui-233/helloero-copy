import { FormikHandlers, FormikProps } from 'formik';

const fieldOptions = <T, U extends keyof T>(
  formik: FormikProps<T>,
  name: U,
  type: 'text' | 'password' | 'tel' = 'text'
): {
  type: string;
  name: U;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: T[U];
  isError: boolean;
} => {
  return {
    type,
    name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
    isError: !!formik.touched[name] && !!formik.errors[name],
  };
};

const errorMessage = <T, U extends keyof T>(
  formik: FormikProps<T>,
  name: U
): string => {
  return formik.touched[name] && formik.errors[name]
    ? (formik.errors[name] as string)
    : '';
};

const formikHelper = {
  fieldOptions,
  errorMessage,
};

export default formikHelper;
