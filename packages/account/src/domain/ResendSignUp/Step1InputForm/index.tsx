import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseResendSignUp } from '../useResendSignUp';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

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
      <Text>{lang.account.resendSignUp.step1.text}</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={formLabels.loginId.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'loginId'),
                placeholder: formLabels.loginId.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'loginId')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard
            type="submit"
            label={lang.account.resendSignUp.step1.button}
          />
        </ButtonSection>
      </form>
    </MainContainer>
  );
};

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
