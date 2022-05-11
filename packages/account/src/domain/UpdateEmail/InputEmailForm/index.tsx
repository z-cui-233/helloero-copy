import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import ButtonStandard from '@/shared/components/ButtonStandard';
import DefinitionListCard from '@/shared/components/DefinitionListCard';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import FormTextField from '@/shared/components/FormTextField';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import formLabels from '@/shared/utils/formLabels';
import formValidations from '@/shared/utils/formValidations';
import formikHelper from '@/shared/utils/formikHelper';
import { UseUpdateEmail } from '../useUpdateEmail';

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

  const emailString = updateEmailState.currentEmail.split('@')[0];
  const padLength = emailString.length - 1;
  const firstDigits = emailString.slice(0, 1);

  return (
    <MainContainer>
      <FormErrorMessage message={updateEmailState.errorMessage} />
      <PageTitle text="メールアドレスの変更" />
      <Section>
        <div>
          ご希望のメールアドレスを入力して、本人確認コードを送信してください。
        </div>
      </Section>
      <Section>
        <DefinitionListCard
          data={[
            {
              title: '現在のメールドレス',
              textsChildren: (
                <div>
                  {firstDigits.padEnd(padLength, '*')}@
                  {updateEmailState.currentEmail.split('@')[1]}
                </div>
              ),
            },
          ]}
        />
      </Section>
      <Section>
        <FieldSection>
          <FormTextField
            label={formLabels.email.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'email', 'email'),
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
