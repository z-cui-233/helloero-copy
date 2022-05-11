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
import { UseResetPassword } from '../useResetPassword';

type Props = {
  resetPasswordState: UseResetPassword['resetPasswordState'];
  verifyCodeAndUpdatePassword: UseResetPassword['verifyCodeAndUpdatePassword'];
};

const ResetPasswordStep2: React.FC<Props> = ({
  resetPasswordState,
  verifyCodeAndUpdatePassword,
}) => {
  const formik = useFormik({
    initialValues: resetPasswordState.formValues,
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode,
      newPassword: formValidations.passwordRegister,
    }),
    onSubmit: verifyCodeAndUpdatePassword,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={resetPasswordState.errorMessage} />
      <PageTitle text="パスワードの変更" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <div>
            下記のメールアドレスに送信した本人確認コードと、ご希望のパスワードを入力してください。
          </div>
        </Section>
        <Section>
          <DefinitionListCard
            data={[
              {
                title: 'メールドレス',
                textsChildren: <div>{resetPasswordState.destination}</div>,
              },
            ]}
          />
        </Section>
        <Section>
          <FieldSection>
            <FormTextField
              label={formLabels.verificationCode.label}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'verificationCode', 'tel'),
                placeholder: formLabels.verificationCode.placeholder,
              }}
              validateMessage={formikHelper.errorMessage(
                formik,
                'verificationCode'
              )}
            />
          </FieldSection>
          <FieldSection>
            <FormTextField
              label={formLabels.newPassword.label}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'newPassword', 'password'),
                autoComplete: 'new-password',
                placeholder: formLabels.newPassword.placeholder,
              }}
              validateMessage={formikHelper.errorMessage(formik, 'newPassword')}
            />
          </FieldSection>
        </Section>
        <ButtonSection>
          <ButtonStandard
            onClick={() => {
              return;
            }}
            type="submit"
            label="パスワードを変更"
          />
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

export default ResetPasswordStep2;
