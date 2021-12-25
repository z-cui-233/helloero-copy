import FormErrorMessage from '@/shared/components/FormErrorMessage';
import MainContainer from '@/shared/components/parts/MainContainer';
import typo from '@/shared/styles/typo';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseSignUp } from '../useSignUp';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikErrorMessage, getFormikFieldOptions } from '@/shared/utils';

const validationSchema = Yup.object().shape({
  loginId: Yup.string().required('入力必須です。'),
  password: Yup.string().required('入力必須です。'),
  email: Yup.string()
    .required('入力必須です。')
    .email('形式が正しくありません。'),
});

const Step1InputForm: React.FC<UseSignUp> = (props) => {
  const { lang } = useLocale();
  const [isMasked, setIsMasked] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: props.signupState.step1FormValues,
    validationSchema,
    onSubmit: props.challengeSignUp,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.signupState.errorMessage} />
      <Title>{lang.account.signUpStep1.title}</Title>
      <Text>{lang.account.signUpStep1.text}</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={lang.account.signUpStep1.loginId}
              fieldOptions={{
                ...getFormikFieldOptions(formik, 'loginId'),
                autoComplete: 'username',
              }}
              validateMessage={getFormikErrorMessage(formik, 'loginId')}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={lang.account.signUpStep1.password}
              fieldOptions={{
                ...getFormikFieldOptions(formik, 'password'),
                type: isMasked ? 'password' : 'text',
                autoComplete: 'new-password',
              }}
              validateMessage={getFormikErrorMessage(formik, 'password')}
            />
            <ShowPassword
              onClick={() => {
                setIsMasked(!isMasked);
              }}
            >
              {lang.account.signUpStep1.showPassword}
            </ShowPassword>
          </FieldSection>
          <FieldSection>
            <TextField
              label={lang.account.signUpStep1.email}
              fieldOptions={getFormikFieldOptions(formik, 'email')}
              validateMessage={getFormikErrorMessage(formik, 'email')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard
            type="submit"
            label={lang.account.signUpStep1.button}
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

const ShowPassword = styled.div`
  ${typo.Body};
  margin: 0.5rem 0 0;
  cursor: pointer;
  display: inline-block;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Step1InputForm;
