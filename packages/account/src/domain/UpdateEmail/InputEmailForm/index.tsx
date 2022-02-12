import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  updateEmailState: UseUpdateEmail['updateEmailState'];
  confirmEmail: UseUpdateEmail['confirmEmail'];
};

const InputEmailForm: React.FC<Props> = ({
  updateEmailState,
  confirmEmail,
}) => {
  const formik = useFormik({
    initialValues: {
      email: updateEmailState.formValues.email,
    },
    validationSchema: Yup.object().shape({
      email: formValidations.email,
    }),
    onSubmit: confirmEmail,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={updateEmailState.errorMessage} />
      <PageTitle text="メールアドレスの変更" />
      <Section>
        <div>
          ご希望のメールアドレスを入力して、本人確認コードを送信してください。
        </div>
        <FieldSection>
          <TextField
            label={formLabels.email.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'email'),
              placeholder: formLabels.email.placeholder,
            }}
            validateMessage={formikHelper.errorMessage(formik, 'email')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label="本人確認コードを送信"
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

export default InputEmailForm;
