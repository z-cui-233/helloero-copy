import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainContainer from '@/shared/components/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import FormTextField from '@/shared/components/FormTextField';
import ButtonStandard from '@/shared/components/ButtonStandard';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import PageTitle from '@/shared/components/PageTitle';
import { UseSignUp } from '../useSignUp';

type Props = {
  signUpState: UseSignUp['signUpState'];
  verifyCode: UseSignUp['verifyCode'];
};

const Step2ConfirmForm: React.FC<Props> = ({ signUpState, verifyCode }) => {
  const formik = useFormik({
    initialValues: signUpState.step2FormValues,
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode,
    }),
    onSubmit: verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={signUpState.errorMessage} />
      <PageTitle text="アカウント登録" />
      <Section>
        <Steps>STEP 2/2</Steps>
        <Text>メールアドレスに送信した本人確認コードを入力してください。</Text>
        <FieldSection>
          <FormTextField
            label={formLabels.verificationCode.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'verificationCode', 'tel'),
              placeholder: formLabels.verificationCode.placeholder,
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
          label="本人確認コードを確認"
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Steps = styled.div`
  ${typo.Note};
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
