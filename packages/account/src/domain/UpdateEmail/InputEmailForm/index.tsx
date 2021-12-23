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
  email: Yup.string()
    .required('入力必須です。')
    .email('形式が正しくありません。'),
});

const InputEmailForm: React.FC<UseUpdateEmail> = (props) => {
  const { lang } = useLocale();
  const formik = useFormik({
    initialValues: {
      email: props.updateEmailState.formValues.email,
    },
    validationSchema,
    onSubmit: props.confirmEmail,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.updateEmailState.errorMessage} />
      <Title>{lang.account.updateEmail.email.title}</Title>
      <Text>{lang.account.updateEmail.email.text}</Text>
      <FieldSection>
        <TextField
          label={lang.account.updateEmail.email.email}
          fieldOptions={{
            type: 'text',
            name: 'email',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.email,
            isError: !!formik.touched.email && !!formik.errors.email,
          }}
          validateMessage={
            formik.touched.email && formik.errors.email
              ? (formik.errors.email as string)
              : ''
          }
        />
      </FieldSection>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.updateEmail.email.button}
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

export default InputEmailForm;
