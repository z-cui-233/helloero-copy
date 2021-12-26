import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseResendSignUp } from '../useResendSignUp';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikErrorMessage, getFormikFieldOptions } from '@/shared/utils';
import formValidations from '@/shared/utils/formValidations';

const Step1InputForm: React.FC<UseResendSignUp> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: props.resendSignUpState.step1FormValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId(locale),
    }),
    onSubmit: props.resendCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resendSignUpState.errorMessage} />
      <Title>{lang.account.resendSignUpStep1.title}</Title>
      <Text>{lang.account.resendSignUpStep1.text}</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={lang.account.resendSignUpStep1.loginId}
              fieldOptions={getFormikFieldOptions(formik, 'loginId')}
              validateMessage={getFormikErrorMessage(formik, 'loginId')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard
            type="submit"
            label={lang.account.resendSignUpStep1.button}
          />
        </ButtonSection>
      </form>
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

export default Step1InputForm;
