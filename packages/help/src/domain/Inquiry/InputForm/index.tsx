import styled from 'styled-components';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UseInquiry } from '../useInquiry';
import PriorConfirmation from './PriorConfirmation';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';
import MainContainer from '@/shared/components/MainContainer';
import { INQUIRY_TYPE_MAP } from '@/localShared/constants/inquiry';
import formValidations from '@/shared/utils/formValidations';
import formikHelper from '@/shared/utils/formikHelper';
import FormTextField from '@/shared/components/FormTextField';
import typo from '@/shared/styles/typo';
import ButtonStandard from '@/shared/components/ButtonStandard';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import FormRadioBox from '@/shared/components/FormRadioBox';
import FormTextAreaField from '@/shared/components/FormTextAreaField';
import FormValidateMessage from '@/shared/components/FormValidateMessage';

type Props = {
  inquiryState: UseInquiry['inquiryState'];
  sendInquiry: UseInquiry['sendInquiry'];
};

const InputForm: React.FC<Props> = ({ inquiryState, sendInquiry }) => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/inquiry',
      text: 'お問い合わせ',
    },
  ];

  const formik = useFormik({
    initialValues: inquiryState.formValues,
    validationSchema: Yup.object().shape({
      detail: formValidations.required,
      contactEmail: formValidations.email,
      registeredEmail: formValidations.optEmail,
    }),
    onSubmit: sendInquiry,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={inquiryState.errorMessage} />
      <PageTitle text="お問い合わせ" />
      <BreadcrumbsList breadcrumbs={breadcrumbs} />
      <PriorConfirmation />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Section>
          <SectionTitle>お問い合わせ項目</SectionTitle>
          <FieldSection>
            {Array.from(INQUIRY_TYPE_MAP).map(([key, value]) => (
              <RadioItem key={key}>
                <FormRadioBox
                  label={value}
                  fieldOptions={{
                    value: key,
                    name: 'inquiryType',
                    onChange: formik.handleChange,
                    checked: key === formik.values.inquiryType,
                  }}
                />
              </RadioItem>
            ))}
          </FieldSection>
        </Section>
        <Section>
          <SectionTitle>内容</SectionTitle>
          <FieldSection>
            <FormTextAreaField
              fieldOptions={{
                placeholder: '具体的にご記入ください',
                onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
                  formik.setFieldValue('detail', e.target.innerText);
                },
                isError: !!formik.touched.detail && !!formik.errors.detail,
              }}
            />
            <FormValidateMessage
              message={formikHelper.errorMessage(formik, 'detail')}
            />
          </FieldSection>
        </Section>
        <Section>
          <SectionTitle>お客様情報</SectionTitle>
          <FieldSection>
            <FormTextField
              label="ご連絡先メールアドレス"
              fieldOptions={{
                ...formikHelper.fieldOptions(formik, 'contactEmail', 'email'),
              }}
              validateMessage={formikHelper.errorMessage(
                formik,
                'contactEmail'
              )}
            />
            <Note>
              ご入力いただいたメールアドレスへ回答をお送りいたします。
            </Note>
          </FieldSection>
          {!inquiryState.isLoggedIn && (
            <FieldSection>
              <FormTextField
                label="ご登録のメールアドレス"
                fieldOptions={{
                  ...formikHelper.fieldOptions(
                    formik,
                    'registeredEmail',
                    'email'
                  ),
                }}
                validateMessage={formikHelper.errorMessage(
                  formik,
                  'registeredEmail'
                )}
              />
              <Note>
                ※アカウント情報の確認のため、ご連絡先のメールアドレスと違う場合はご入力ください。
                <br />
                ※利用開始前のお客様は空欄のまま送信してください。
              </Note>
            </FieldSection>
          )}
        </Section>
        <ButtonSection>
          <ButtonStandard type="submit" label="お問い合わせを送信" />
        </ButtonSection>
      </form>
    </MainContainer>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
`;

const SectionTitle = styled.div`
  ${typo.Lead2};
  line-height: 1.4;
`;

const RadioItem = styled.div`
  margin: 0.25rem 0 0;
`;

const FieldSection = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

const Note = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 0.5rem 0 0;
`;
export default InputForm;
