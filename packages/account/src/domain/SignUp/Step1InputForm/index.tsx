import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseSignUp } from '../useSignUp';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import FormTextField from '@/shared/components/FormTextField';
import ButtonStandard from '@/shared/components/ButtonStandard';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import {
  PRIVACY_URL,
  TERMS_SERVICE_URL,
  TERMS_ACCOUNT_URL,
} from '@/shared/constants/terms';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  signUpState: UseSignUp['signUpState'];
  challengeSignUp: UseSignUp['challengeSignUp'];
};

const Step1InputForm: React.FC<Props> = ({ signUpState, challengeSignUp }) => {
  const formik = useFormik({
    initialValues: signUpState.step1FormValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId,
      password: formValidations.password,
      email: formValidations.email,
    }),
    onSubmit: challengeSignUp,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={signUpState.errorMessage} />
      <PageTitle text="アカウント登録" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <Steps>STEP 1/2</Steps>
          <Text>お客様情報を入力してください</Text>
          <FieldSection>
            <FormTextField
              label={formLabels.loginId.label}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'loginId', 'text'),
                autoComplete: 'username',
                placeholder: formLabels.loginId.placeholder,
              }}
              validateMessage={formikHelper.errorMessage(formik, 'loginId')}
            />
          </FieldSection>
          <FieldSection>
            <FormTextField
              label={formLabels.password.label}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'password', 'password'),
                autoComplete: 'new-password',
                placeholder: formLabels.password.placeholder,
              }}
              validateMessage={formikHelper.errorMessage(formik, 'password')}
            />
          </FieldSection>
          <FieldSection>
            <FormTextField
              label={formLabels.email.label}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'email', 'email'),
                placeholder: formLabels.email.placeholder,
              }}
              validateMessage={formikHelper.errorMessage(formik, 'email')}
            />
          </FieldSection>
        </Section>
        <Terms>
          <div>
            登録ボタンを押すことにより、下記の規約に同意するものとします。
          </div>
          <div>
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
              個人情報の取扱いについて
            </a>
            <a
              href={TERMS_SERVICE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              サービス利用規約
            </a>
            <a
              href={TERMS_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              アカウント利用規約
            </a>
          </div>
        </Terms>
        <ButtonSection>
          <ButtonStandard type="submit" label="規約に同意して登録" />
        </ButtonSection>
      </form>
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

const Terms = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 2rem 0 0;

  & a {
    font-size: inherit;
    color: inherit;
    text-decoration: underline;
    display: inline-block;
    margin: 0.25rem 0.5rem 0 0;
  }
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Step1InputForm;
