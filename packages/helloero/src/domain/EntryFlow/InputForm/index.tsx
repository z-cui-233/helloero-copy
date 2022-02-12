import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseEntryWabiken } from '../useEntryWabiken';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import TextField from '@/shared/components/parts/TextField';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  entryWabikenState: UseEntryWabiken['entryWabikenState'];
  confirmWabiken: UseEntryWabiken['confirmWabiken'];
};

const InputForm: React.FC<Props> = ({ entryWabikenState, confirmWabiken }) => {
  const formik = useFormik({
    initialValues: entryWabikenState.formValues,
    validationSchema: Yup.object().shape({
      wabiken: formValidations.wabiken,
    }),
    onSubmit: confirmWabiken,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={entryWabikenState.errorMessage} />
      <PageTitle text="シリアルコードの登録" />
      <Section>
        <div>購入時に受け取った、シリアルコードを入力してください。</div>
        <FieldSection>
          <TextField
            label={formLabels.wabiken.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'wabiken'),
              placeholder: formLabels.wabiken.placeholder,
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
          label="シリアルコードを確認"
        />
      </ButtonSection>
    </MainContainer>
  );
};

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
