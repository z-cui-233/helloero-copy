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
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

type Props = {
  resendSignUpState: UseResendSignUp['resendSignUpState'];
  invokeLogin: UseResendSignUp['invokeLogin'];
};

const Step3ReLoginForm: React.FC<Props> = ({
  resendSignUpState,
  invokeLogin,
}) => {
  const formik = useFormik({
    initialValues: resendSignUpState.step3FormValues,
    validationSchema: Yup.object().shape({
      password: formValidations.password,
    }),
    onSubmit: invokeLogin,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={resendSignUpState.errorMessage} />
      <Text>パスワードを入力して、ログインしてください</Text>
      <Section>
        <FieldSection>
          <LoginId>{resendSignUpState.step1FormValues.loginId}</LoginId>
        </FieldSection>
        <FieldSection>
          <TextField
            label={formLabels.password.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'password', 'password'),
              placeholder: formLabels.password.placeholder,
            }}
            validateMessage={formikHelper.errorMessage(formik, 'password')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label="ログイン"
        />
      </ButtonSection>
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
