import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import ButtonStandard from '@/shared/components/ButtonStandard';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import FormTextField from '@/shared/components/FormTextField';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import typo from '@/shared/styles/typo';
import formLabels from '@/shared/utils/formLabels';
import formValidations from '@/shared/utils/formValidations';
import formikHelper from '@/shared/utils/formikHelper';
import { UseLoginChallenge } from '../useLoginChallenge';

type Props = {
  loginChallengeState: UseLoginChallenge['loginChallengeState'];
  challengeLogin: UseLoginChallenge['challengeLogin'];
};

const InputForm: React.FC<Props> = ({
  loginChallengeState,
  challengeLogin,
}) => {
  const formik = useFormik({
    initialValues: loginChallengeState.formValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId,
      password: formValidations.password,
    }),
    onSubmit: challengeLogin,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={loginChallengeState.errorMessage} />
      <PageTitle text="ログイン" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
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
            <ResetPassword>
              <Link href={'/reset-password'} passHref>
                <ResetPasswordLink>パスワードを忘れた方</ResetPasswordLink>
              </Link>
            </ResetPassword>
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard type="submit" label="ログイン" />
        </ButtonSection>
        <SignUp>
          <Link href={'/signup'} passHref>
            <SignUpLink>アカウントを無料で登録</SignUpLink>
          </Link>
        </SignUp>
      </form>
    </MainContainer>
  );
};

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

const ResetPassword = styled.div`
  margin: 0.5rem 0 0;
`;

const ResetPasswordLink = styled.a`
  ${typo.Body};
  text-decoration: underline;
  color: ${({ theme }) => theme.foreground.primary};
`;

const SignUp = styled.div`
  margin: 2rem 0 0;
  text-align: center;
`;

const SignUpLink = styled.a`
  ${typo.Lead2};
  color: ${({ theme }) => theme.foreground.primary};
  text-decoration: underline;
`;

export default InputForm;
