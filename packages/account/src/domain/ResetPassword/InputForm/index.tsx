import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseResetPassword } from '../useResetPassword';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikFieldOptions, getFormikErrorMessage } from '@/shared/utils';

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required('入力必須です。'),
  newPassword: Yup.string().required('入力必須です。'),
});

const InputForm: React.FC<UseResetPassword> = (props) => {
  const { lang } = useLocale();

  const formik = useFormik({
    initialValues: props.resetPasswordState.formValues,
    validationSchema,
    onSubmit: props.verifyCodeAndUpdatePassword,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Title>{lang.account.resetPassword.input.title}</Title>
      <Text>
        <div>{lang.account.resetPassword.input.text}</div>
        <DestinationMail>
          {props.resetPasswordState.destination}
        </DestinationMail>
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={lang.account.resetPassword.input.verificationCode}
              fieldOptions={getFormikFieldOptions(
                formik,
                'verificationCode',
                'tel'
              )}
              validateMessage={getFormikErrorMessage(
                formik,
                'verificationCode'
              )}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={lang.account.resetPassword.input.newPassword}
              fieldOptions={{
                ...getFormikFieldOptions(formik, 'newPassword', 'password'),
                autoComplete: 'new-password',
              }}
              validateMessage={getFormikErrorMessage(formik, 'password')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard
            onClick={() => {
              return;
            }}
            type="submit"
            label={lang.account.resetPassword.input.button}
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

const DestinationMail = styled.div`
  ${typo.Standard};
  font-weight: bold;
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

export default InputForm;
