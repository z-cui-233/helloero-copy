import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseEntryWabiken } from '../useEntryWabiken';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import TextField from '@/shared/components/parts/TextField';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import { useLocale } from '@/shared/context/LocaleContext';
import { getFormikFieldOptions, getFormikErrorMessage } from '@/shared/utils';

const validationSchema = Yup.object().shape({
  wabiken: Yup.string()
    .required('入力必須です。')
    .matches(/^[0-9a-zA-Z]/, '半角英数字で入力してください。')
    .length(16, '16文字で入力してください。'),
});

const InputForm: React.FC<UseEntryWabiken> = (props) => {
  const { lang } = useLocale();

  const formik = useFormik({
    initialValues: props.entryWabikenState.formValues,
    validationSchema,
    onSubmit: props.confirmWabiken,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.entryWabikenState.errorMessage} />
      <Title>{lang.helloero.entry.input.title}</Title>
      <Text>{lang.helloero.entry.input.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={lang.helloero.entry.input.serial}
            fieldOptions={getFormikFieldOptions(formik, 'wabiken')}
            validateMessage={getFormikErrorMessage(formik, 'wabiken')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label={lang.helloero.entry.input.button}
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

export default InputForm;
