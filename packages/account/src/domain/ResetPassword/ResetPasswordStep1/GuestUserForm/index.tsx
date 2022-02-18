import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import ButtonStandard from '@/shared/components/ButtonStandard';
import FormTextField from '@/shared/components/FormTextField';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';
import MainContainer from '@/shared/components/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  resetPasswordState: UseResetPassword['resetPasswordState'];
  sendVerificationCode: UseResetPassword['sendVerificationCode'];
};

const GuestUserForm: React.FC<Props> = ({
  resetPasswordState,
  sendVerificationCode,
}) => {
  const formik = useFormik({
    initialValues: {
      loginId: resetPasswordState.formValues.loginId,
    },
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId,
    }),
    onSubmit: sendVerificationCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={resetPasswordState.errorMessage} />
      <PageTitle text="パスワードの変更" />
      <Section>
        <div>
          パスワードを変更するには、本人確認が必要です。ご登録のメールアドレスに確認メールを送信します。
        </div>
        <FieldSection>
          <FormTextField
            label={formLabels.loginId.label}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'loginId', 'text'),
              placeholder: formLabels.loginId.placeholder,
            }}
            validateMessage={formikHelper.errorMessage(formik, 'loginId')}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label="本人確認メールを送信"
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

export default GuestUserForm;
