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
import { UseResendSignUp } from '../useResendSignUp';

type Props = {
  resendSignUpState: UseResendSignUp['resendSignUpState'];
  verifyCode: UseResendSignUp['verifyCode'];
};

const Step2ConfirmForm: React.FC<Props> = ({
  resendSignUpState,
  verifyCode,
}) => {
  const formik = useFormik({
    initialValues: resendSignUpState.step2FormValues,
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode,
    }),
    onSubmit: verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={resendSignUpState.errorMessage} />
      <PageTitle text="アカウント登録の再開" />
      <Section>
        <div>メールアドレスに送信した本人確認コードを入力してください。</div>
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
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            formik.handleSubmit();
          }}
          label="本人確認コードを認証"
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

export default Step2ConfirmForm;
