import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import { UseResetPassword } from '../useResetPassword';
import { useLocale } from '@/shared/context/LocaleContext';

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required('入力必須です。'),
  newPassword: Yup.string().required('入力必須です。'),
});

const InputForm: React.FC<UseResetPassword> = (props) => {
  const { lang } = useLocale();

  const formik = useFormik({
    initialValues: props.resetPasswordState.formValues,
    validationSchema,
    onSubmit: props.verifyCodeAndUpdatePassword,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Title>{lang.account.resetPassword.input.title}</Title>
      <Text>
        <div>{lang.account.resetPassword.input.text}</div>
        <DestinationMail>
          {props.resetPasswordState.destination}
        </DestinationMail>
      </Text>
      <FieldSection>
        <TextField
          label={lang.account.resetPassword.input.verificationCode}
          fieldOptions={{
            type: 'text',
            name: 'verificationCode',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.verificationCode,
            isError:
              !!formik.touched.verificationCode &&
              !!formik.errors.verificationCode,
          }}
          validateMessage={
            formik.touched.verificationCode && formik.errors.verificationCode
              ? (formik.errors.verificationCode as string)
              : ''
          }
        />
      </FieldSection>
      <FieldSection>
        <TextField
          label={lang.account.resetPassword.input.newPassword}
          fieldOptions={{
            type: 'text',
            name: 'newPassword',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.newPassword,
            isError:
              !!formik.touched.newPassword && !!formik.errors.newPassword,
          }}
          validateMessage={
            formik.touched.newPassword && formik.errors.newPassword
              ? (formik.errors.newPassword as string)
              : ''
          }
        />
      </FieldSection>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.resetPassword.input.button}
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

const DestinationMail = styled.div`
  ${typo.Standard};
  font-weight: bold;
  margin: 1rem 0 0;
`;

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default InputForm;
