import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { globalConfig } from 'src/globalConfig';
import { UseSignUp } from '../useSignUp';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import TextField from '@/shared/components/parts/TextField';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import { useLocale } from '@/shared/context/LocaleContext';
import formValidations from '@/shared/utils/formValidations';
import formLabels from '@/shared/utils/formLabels';
import formikHelper from '@/shared/utils/formikHelper';

type Props = {
  signUpState: UseSignUp['signUpState'];
  challengeSignUp: UseSignUp['challengeSignUp'];
};

const Step1InputForm: React.FC<Props> = ({ signUpState, challengeSignUp }) => {
  const { lang, locale } = useLocale();

  const formik = useFormik({
    initialValues: signUpState.step1FormValues,
    validationSchema: Yup.object().shape({
      loginId: formValidations.loginId(locale),
      password: formValidations.password(locale),
      email: formValidations.email(locale),
    }),
    onSubmit: challengeSignUp,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={signUpState.errorMessage} />
      <Steps>STEP 1/2</Steps>
      <Text>{lang.account.signUp.step1.text}</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <FieldSection>
            <TextField
              label={formLabels.loginId.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'loginId'),
                autoComplete: 'username',
                placeholder: formLabels.loginId.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'loginId')}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={formLabels.password.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'password', 'password'),
                autoComplete: 'new-password',
                placeholder: formLabels.password.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'password')}
            />
          </FieldSection>
          <FieldSection>
            <TextField
              label={formLabels.email.label[locale]}
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'email'),
                placeholder: formLabels.email.placeholder[locale],
              }}
              validateMessage={formikHelper.errorMessage(formik, 'email')}
            />
          </FieldSection>
        </Section>
        <Terms>
          <div>{lang.account.signUp.step1.terms.title}</div>
          <div>
            {/* 個人情報保護方針 */}
            <a
              href={`${globalConfig.HELP}/${locale}/terms/privacy`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.signUp.step1.terms.privacy}
            </a>
            {/* 利用規約 */}
            <a
              href={`${globalConfig.HELP}/${locale}/terms/service`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.signUp.step1.terms.service}
            </a>
          </div>
        </Terms>
        <ButtonSection>
          <ButtonStandard
            type="submit"
            label={lang.account.signUp.step1.button}
          />
        </ButtonSection>
      </form>
    </MainContainer>
  );
};

const Steps = styled.div`
  ${typo.Body};
  font-weight: bold;
`;

const Text = styled.div`
  ${typo.Standard};
  margin: 0.5rem 0 0;
`;

const Section = styled.div`
  margin: 2rem 0 0;
`;

const FieldSection = styled.div`
  margin: 1rem 0 0;
`;

const Terms = styled.div`
  ${typo.Note};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 2rem 0 0;

  & a {
    font-size: inherit;
    color: inherit;
    text-decoration: underline;
    display: inline-block;

    & + a {
      margin: 0 0 0 0.5rem;
    }
  }
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Step1InputForm;