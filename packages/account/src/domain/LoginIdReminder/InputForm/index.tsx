import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import ButtonStandard from '@/shared/components/ButtonStandard';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import FormTextField from '@/shared/components/FormTextField';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import formLabels from '@/shared/utils/formLabels';
import formValidations from '@/shared/utils/formValidations';
import formikHelper from '@/shared/utils/formikHelper';
import { UseLoginIdReminder } from '../useLoginIdReminder';

type Props = {
  loginIdReminderState: UseLoginIdReminder['loginIdReminderState'];
  sendReminder: UseLoginIdReminder['sendReminder'];
};

const InputForm: React.FC<Props> = ({ loginIdReminderState, sendReminder }) => {
  const formik = useFormik({
    initialValues: loginIdReminderState.formValues,
    validationSchema: Yup.object().shape({
      mailAddress: formValidations.email,
    }),
    onSubmit: sendReminder,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={loginIdReminderState.errorMessage} />
      <PageTitle text="ログインIDの確認" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <div>
            ご登録のメールアドレスへお知らせします。
            <br />
            アカウント登録時に利用したメールアドレスを入力してください。
          </div>
        </Section>
        <Section>
          <FieldSection>
            <FormTextField
              label={formLabels.email.label}
              fieldOptions={formikHelper.fieldOptions(
                formik,
                'mailAddress',
                'email'
              )}
              validateMessage={formikHelper.errorMessage(formik, 'mailAddress')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard type="submit" label="メールを送信" />
        </ButtonSection>
      </form>
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
