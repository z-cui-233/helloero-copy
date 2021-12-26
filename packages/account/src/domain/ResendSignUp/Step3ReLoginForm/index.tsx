import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseResendSignUp } from '../useResendSignUp';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { getFormikErrorMessage, getFormikFieldOptions } from '@/shared/utils';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';

const Step3ReLoginForm: React.FC<UseResendSignUp> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: props.resendSignUpState.step3FormValues,
    validationSchema: Yup.object().shape({
      password: formValidations.password(locale),
    }),
    onSubmit: props.invokeLogin,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resendSignUpState.errorMessage} />
      <Title>{lang.account.resendSignUpStep3.title}</Title>
      <Text>{lang.account.resendSignUpStep3.text}</Text>
      <Section>
        <FieldSection>
          <LoginId>{props.resendSignUpState.step1FormValues.loginId}</LoginId>
        </FieldSection>
        <FieldSection>
          <TextField
            label={formLabels.password.label[locale]}
            fieldOptions={{
              ...getFormikFieldOptions(formik, 'password', 'password'),
              placeholder: formLabels.password.placeholder[locale],
            }}
            validateMessage={getFormikErrorMessage(formik, 'password')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.resendSignUpStep3.button}
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

const LoginId = styled.div`
  ${typo.Standard};
  font-weight: bold;
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Step3ReLoginForm;
