import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required('入力必須です。'),
});

const InputVerificationCodeForm: React.FC<UseUpdateEmail> = (props) => {
  const { lang } = useLocale();
  const formik = useFormik({
    initialValues: {
      verificationCode: props.updateEmailState.formValues.verificationCode,
    },
    validationSchema,
    onSubmit: props.verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.updateEmailState.errorMessage} />
      <Title>{lang.account.updateEmail.verification.title}</Title>
      <Text>{lang.account.updateEmail.verification.text}</Text>
      <FieldSection>
        <TextField
          label={lang.account.updateEmail.verification.code}
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
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.updateEmail.verification.button}
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

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default InputVerificationCodeForm;
