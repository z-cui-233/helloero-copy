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
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

const ResetPasswordStep2: React.FC<UseResetPassword> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: props.resetPasswordState.formValues,
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode(locale),
      newPassword: formValidations.password(locale),
    }),
    onSubmit: props.verifyCodeAndUpdatePassword,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Text>
        <div>{lang.account.resetPassword.input.text}</div>
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <DestinationMail>
              {props.resetPasswordState.destination}
            </DestinationMail>
          </FieldSection>
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
          <FieldSection>
            <TextField
              label={formLabels.newPassword.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'newPassword', 'password'),
                autoComplete: 'new-password',
                placeholder: formLabels.newPassword.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'newPassword')}
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

export default ResetPasswordStep2;
