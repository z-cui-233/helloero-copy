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

const Step2ConfirmForm: React.FC<UseResendSignUp> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: props.resendSignUpState.step2FormValues,
    validationSchema: Yup.object().shape({
      code: formValidations.verificationCode(locale),
    }),
    onSubmit: props.verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resendSignUpState.errorMessage} />
      <Title>{lang.account.resendSignUpStep2.title}</Title>
      <Text>{lang.account.resendSignUpStep2.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={formLabels.verificationCode.label[locale]}
            fieldOptions={{
              ...getFormikFieldOptions(formik, 'code', 'tel'),
              placeholder: formLabels.verificationCode.placeholder[locale],
            }}
            validateMessage={getFormikErrorMessage(formik, 'code')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.resendSignUpStep2.button}
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
