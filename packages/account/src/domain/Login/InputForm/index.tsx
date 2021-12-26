import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { UseLoginChallenge } from '../useLoginChallenge';
import MainContainer from '@/shared/components/parts/MainContainer';
import typo from '@/shared/styles/typo';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import TextField from '@/shared/components/parts/TextField';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikErrorMessage, getFormikFieldOptions } from '@/shared/utils';
import formValidations from '@/shared/utils/formValidations';

const InputForm: React.FC<UseLoginChallenge> = (props) => {
  const { locale, lang } = useLocale();

  const formik = useFormik({
    initialValues: props.loginChallengeState.formValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId(locale),
      password: formValidations.password(locale),
    }),
    onSubmit: props.challengeLogin,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.loginChallengeState.errorMessage} />
      <Title>{lang.account.login.title}</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={lang.account.login.loginId}
              fieldOptions={{
                ...getFormikFieldOptions(formik, 'loginId'),
                autoComplete: 'username',
              }}
              validateMessage={getFormikErrorMessage(formik, 'loginId')}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={lang.account.login.password}
              fieldOptions={{
                ...getFormikFieldOptions(formik, 'password', 'password'),
                autoComplete: 'new-password',
              }}
              validateMessage={getFormikErrorMessage(formik, 'password')}
            />
            <ResetPassword>
              <Link href={`/${locale}/reset-password`} passHref>
                <ResetPasswordLink>
                  {lang.account.login.resetPassword}
                </ResetPasswordLink>
              </Link>
            </ResetPassword>
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard type="submit" label={lang.account.login.button} />
        </ButtonSection>
        <SignUp>
          <Link href={`/${locale}/signup`} passHref>
            <SignUpLink>{lang.account.login.signUp}</SignUpLink>
          </Link>
        </SignUp>
      </form>
    </MainContainer>
  );
};

const Title = styled.div`
  ${typo.Heading2};
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
