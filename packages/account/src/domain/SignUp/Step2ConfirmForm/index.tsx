import FormErrorMessage from '@/shared/components/FormErrorMessage';
import MainContainer from '@/shared/components/parts/MainContainer';
import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseSignUp } from '../useSignUp';
import typo from '@/shared/styles/typo';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { getFormikErrorMessage, getFormikFieldOptions } from '@/shared/utils';
import { useLocale } from '@/shared/context/LocaleContext';

const validationSchema = Yup.object().shape({
  code: Yup.string().required('入力必須です。'),
});

const Step2ConfirmForm: React.FC<UseSignUp> = (props) => {
  const { lang } = useLocale();

  const formik = useFormik({
    initialValues: props.signupState.step2FormValues,
    validationSchema,
    onSubmit: props.verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.signupState.errorMessage} />
      <Title>{lang.account.signUpStep2.title}</Title>
      <Text>{lang.account.signUpStep2.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={lang.account.signUpStep2.code}
            fieldOptions={getFormikFieldOptions(formik, 'code', 'tel')}
            validateMessage={getFormikErrorMessage(formik, 'code')}
          />
        </FieldSection>
      </Section>
      <Section>{lang.account.signUpStep2.terms}</Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.signUpStep2.button}
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

const Section = styled.div`
  margin: 2rem 0 0;
`;

const FieldSection = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Step2ConfirmForm;
