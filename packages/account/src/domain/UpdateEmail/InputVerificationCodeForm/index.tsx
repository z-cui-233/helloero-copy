import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import TextField from '@/shared/components/parts/TextField';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

type Props = {
  updateEmailState: UseUpdateEmail['updateEmailState'];
  verifyCode: UseUpdateEmail['verifyCode'];
};

const InputVerificationCodeForm: React.FC<Props> = ({
  updateEmailState,
  verifyCode,
}) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: {
      verificationCode: updateEmailState.formValues.verificationCode,
    },
    validationSchema: Yup.object().shape({
      verificationCode: formValidations.verificationCode(locale),
    }),
    onSubmit: verifyCode,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={updateEmailState.errorMessage} />
      <Text>{lang.account.updateEmail.verification.text}</Text>
      <Section>
        <FieldSection>
          <TextField
            label={formLabels.verificationCode.label[locale]}
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'verificationCode', 'tel'),
              placeholder: formLabels.verificationCode.placeholder[locale],
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
          label={lang.account.updateEmail.verification.button}
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

export default InputVerificationCodeForm;
