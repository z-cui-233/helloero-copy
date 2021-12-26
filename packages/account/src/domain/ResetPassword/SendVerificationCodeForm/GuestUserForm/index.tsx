import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import typo from '@/shared/styles/typo';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import { getFormikFieldOptions, getFormikErrorMessage } from '@/shared/utils';
import formValidations from '@/shared/utils/formValidations';

const GuestUserForm: React.FC<UseResetPassword> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: {
      userName: props.resetPasswordState.formValues.userName,
    },
    validationSchema: Yup.object().shape({
      userName: formValidations.loginId(locale),
    }),
    onSubmit: props.sendVerificationCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Title>{lang.account.resetPassword.send.title}</Title>
      <Text>{lang.account.resetPassword.send.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={lang.account.resetPassword.send.userName}
            fieldOptions={getFormikFieldOptions(formik, 'userName')}
            validateMessage={getFormikErrorMessage(formik, 'userName')}
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

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default GuestUserForm;
