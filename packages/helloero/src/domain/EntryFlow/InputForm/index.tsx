import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseEntryWabiken } from '../useEntryWabiken';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import TextField from '@/shared/components/parts/TextField';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

type Props = {
  entryWabikenState: UseEntryWabiken['entryWabikenState'];
  confirmWabiken: UseEntryWabiken['confirmWabiken'];
};

const InputForm: React.FC<Props> = ({ entryWabikenState, confirmWabiken }) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: entryWabikenState.formValues,
    validationSchema: Yup.object().shape({
      wabiken: formValidations.wabiken(locale),
    }),
    onSubmit: confirmWabiken,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={entryWabikenState.errorMessage} />
      <Text>{lang.helloero.entry.input.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={formLabels.wabiken.label[locale]}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'wabiken'),
              placeholder: formLabels.wabiken.placeholder[locale],
            }}
            validateMessage={formikHelper.errorMessage(formik, 'wabiken')}
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