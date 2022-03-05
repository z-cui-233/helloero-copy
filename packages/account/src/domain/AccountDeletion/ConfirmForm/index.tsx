import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import ButtonStandard from '@/shared/components/ButtonStandard';
import typo from '@/shared/styles/typo';
import FormCheckBox from '@/shared/components/FormCheckBox';
import Portal from '@/shared/components/Portal';
import PortalModalDialog from '@/shared/components/PortalModalDialog';
import formikHelper from '@/shared/utils/formikHelper';
import { UseAccountDeletion } from '../useAccountDeletion';

type Props = {
  accountDeletionState: UseAccountDeletion['accountDeletionState'];
  toggleConfirmDialog: UseAccountDeletion['toggleConfirmDialog'];
  invokeDeletion: UseAccountDeletion['invokeDeletion'];
};

const ConfirmForm: React.FC<Props> = ({
  accountDeletionState,
  toggleConfirmDialog,
  invokeDeletion,
}) => {
  const formik = useFormik({
    initialValues: accountDeletionState.formValues,
    validationSchema: Yup.object().shape({
      check1: Yup.boolean().oneOf([true], '必須です'),
      check2: Yup.boolean().oneOf([true], '必須です'),
    }),
    onSubmit: toggleConfirmDialog,
  });

  return (
    <MainContainer>
      <FormErrorMessage message={accountDeletionState.errorMessage} />
      <PageTitle text="アカウントの削除" />
      <Section>
        <div>
          下記の内容をご確認の上、チェックボックスにチェックしてください。（必須）
        </div>
      </Section>
      <Section>
        <FieldSection>
          <FormCheckBox
            label="アカウントが削除され、ログインできなくなります。"
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'check1', 'checkbox'),
              checked: formik.values.check1,
            }}
          />
        </FieldSection>
        <FieldSection>
          <FormCheckBox
            label="購入した映像作品が視聴できなくなります。"
            fieldOptions={{
              ...formikHelper.fieldOptions(formik, 'check2', 'checkbox'),
              checked: formik.values.check2,
            }}
          />
        </FieldSection>
      </Section>
      <ButtonSection>
        <ButtonStandard
          type="button"
          label="アカウントを削除する"
          onClick={() => {
            formik.handleSubmit();
          }}
          style={{
            opacity: !formik.values.check1 || !formik.values.check2 ? 0.3 : 1,
          }}
          disabled={!formik.values.check1 || !formik.values.check2}
        />
        <Link href="/" passHref>
          <StyledLink>キャンセル</StyledLink>
        </Link>
      </ButtonSection>
      {accountDeletionState.isDisplayedConfirmDialog && (
        <Portal>
          <PortalModalDialog
            title="アカウントの削除"
            body={<div>本当に削除してよろしいですか？</div>}
            cancelText="いいえ"
            onClickCancel={() => {
              toggleConfirmDialog();
            }}
            cancelWarning="はい"
            onClickWarning={() => {
              invokeDeletion();
            }}
          />
        </Portal>
      )}
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

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  text-decoration: underline;
  display: inline-block;
  margin: 1.5rem auto 0;
`;

export default ConfirmForm;
