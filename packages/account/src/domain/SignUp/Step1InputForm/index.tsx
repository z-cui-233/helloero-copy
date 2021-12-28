import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseSignUp } from '../useSignUp';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

const Step1InputForm: React.FC<UseSignUp> = (props) => {
  const { lang, locale } = useLocale();
  const [isMasked, setIsMasked] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: props.signupState.step1FormValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId(locale),
      password: formValidations.password(locale),
      email: formValidations.email(locale),
    }),
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
              label={formLabels.loginId.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'loginId'),
                autoComplete: 'username',
                placeholder: formLabels.loginId.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'loginId')}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={formLabels.password.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'password'),
                type: isMasked ? 'password' : 'text',
                autoComplete: 'new-password',
                placeholder: formLabels.password.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'password')}
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
              label={formLabels.email.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'email'),
                placeholder: formLabels.email.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'email')}
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
