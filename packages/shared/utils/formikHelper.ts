import { FormikHandlers, FormikProps } from 'formik';

const fieldOptions = <T>(
  formik: FormikProps<T>,
  name: keyof T,
  type: 'text' | 'password' | 'tel' | 'email' | 'checkbox' | 'select' | 'radio'
): {
  type?: string;
  name: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
} => {
  return type && ['text', 'password', 'tel', 'email'].includes(type)
    ? {
        type,
        name: name as string,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values[name] as unknown as string,
        isError: !!formik.touched[name] && !!formik.errors[name],
      }
    : {
        name: name as string,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values[name] as unknown as string,
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
