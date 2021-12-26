import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikFieldOptions, getFormikErrorMessage } from '@/shared/utils';
import formValidations from '@/shared/utils/formValidations';

const InputEmailForm: React.FC<UseUpdateEmail> = (props) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: {
      email: props.updateEmailState.formValues.email,
    },
    validationSchema: Yup.object().shape({
      email: formValidations.email(locale),
    }),
    onSubmit: props.confirmEmail,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.updateEmailState.errorMessage} />
      <Title>{lang.account.updateEmail.email.title}</Title>
      <Text>{lang.account.updateEmail.email.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={lang.account.updateEmail.email.email}
            fieldOptions={getFormikFieldOptions(formik, 'email')}
            validateMessage={getFormikErrorMessage(formik, 'email')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.account.updateEmail.email.button}
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

export default InputEmailForm;
