import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseSignUp } from '../useSignUp';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

type Props = {
  signUpState: UseSignUp['signUpState'];
  verifyCode: UseSignUp['verifyCode'];
};

const Step2ConfirmForm: React.FC<Props> = ({ signUpState, verifyCode }) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: signUpState.step2FormValues,
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode(locale),
    }),
    onSubmit: verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={signUpState.errorMessage} />
      <Steps>STEP 2/2</Steps>
      <Text>{lang.account.signUp.step2.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={formLabels.verificationCode.label[locale]}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'verificationCode', 'tel'),
              placeholder: formLabels.verificationCode.placeholder[locale],
            }}
            validateMessage={formikHelper.errorMessage(
              formik,
              'verificationCode'
            )}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.signUp.step2.button}
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Steps = styled.div`
  ${typo.Body};
  font-weight: bold;
`;

const Text = styled.div`
  margin: 0.5rem 0 0;
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
