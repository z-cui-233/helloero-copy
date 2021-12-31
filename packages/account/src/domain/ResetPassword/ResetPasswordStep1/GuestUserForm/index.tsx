import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

const GuestUserForm: React.FC<UseResetPassword> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: {
      loginId: props.resetPasswordState.formValues.loginId,
    },
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId(locale),
    }),
    onSubmit: props.sendVerificationCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Text>{lang.account.resetPassword.send.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={formLabels.loginId.label[locale]}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'loginId'),
              placeholder: formLabels.loginId.placeholder[locale],
            }}
            validateMessage={formikHelper.errorMessage(formik, 'loginId')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.resetPassword.send.button}
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

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default GuestUserForm;
