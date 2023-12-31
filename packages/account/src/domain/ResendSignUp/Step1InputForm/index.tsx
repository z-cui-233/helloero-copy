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
  resendCode: UseResendSignUp['resendCode'];
};

const Step1InputForm: React.FC<Props> = ({ resendSignUpState, resendCode }) => {
  const formik = useFormik({
    initialValues: resendSignUpState.step1FormValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId,
    }),
    onSubmit: resendCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={resendSignUpState.errorMessage} />
      <PageTitle text="アカウント登録の再開" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <div>
            ログインIDを入力して、ご登録のメールアドレスに本人確認コードを送信してください。
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
          <ButtonStandard type="submit" label="本人確認コードを送信" />
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

export default Step1InputForm;
