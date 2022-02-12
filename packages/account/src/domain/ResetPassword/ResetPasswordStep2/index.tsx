import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseResetPassword } from '../useResetPassword';
import ButtonStandard from '@/shared/components/ButtonStandard';
import MainContainer from '@/shared/components/MainContainer';
import FormTextField from '@/shared/components/FormTextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import typo from '@/shared/styles/typo';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import PageTitle from '@/shared/components/PageTitle';

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
      newPassword: formValidations.password,
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
          <FieldSection>
            <DestinationMail>{resetPasswordState.destination}</DestinationMail>
          </FieldSection>
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

const DestinationMail = styled.div`
  ${typo.Standard};
  font-weight: bold;
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

export default ResetPasswordStep2;
