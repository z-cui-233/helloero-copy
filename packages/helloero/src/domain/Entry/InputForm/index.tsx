import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import TextField from '@/shared/components/parts/TextField';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import { UseEntryWabiken } from '../useEntryWabiken';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import { useLocale } from '@/shared/context/LocaleContext';

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
    onSubmit: (
      values: UseEntryWabiken['entryWabikenState']['formValues']
    ): void => {
      props.confirmWabiken(values);
    },
  });

  return (
    <MainContainer>
      <FormErrorMessage message={props.entryWabikenState.errorMessage} />
      <Title>{lang.helloero.entry.input.title}</Title>
      <Text>{lang.helloero.entry.input.text}</Text>
      <FieldSection>
        <TextField
          label={lang.helloero.entry.input.serial}
          fieldOptions={{
            type: 'text',
            name: 'wabiken',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.wabiken,
            isError: !!formik.touched.wabiken && !!formik.errors.wabiken,
          }}
          validateMessage={
            formik.touched.wabiken && formik.errors.wabiken
              ? (formik.errors.wabiken as string)
              : ''
          }
        />
      </FieldSection>
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

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default InputForm;
