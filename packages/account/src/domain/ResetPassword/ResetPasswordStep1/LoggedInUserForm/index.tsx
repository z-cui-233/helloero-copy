import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import ButtonStandard from '@/shared/components/ButtonStandard';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import MainContainer from '@/shared/components/MainContainer';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  resetPasswordState: UseResetPassword['resetPasswordState'];
  sendVerificationCode: UseResetPassword['sendVerificationCode'];
};

const LoggedInUserForm: React.FC<Props> = ({
  resetPasswordState,
  sendVerificationCode,
}) => {
  const { userInfo } = useLoginStateContext();

  return (
    <MainContainer>
      <FormErrorMessage message={resetPasswordState.errorMessage} />
      <PageTitle text="パスワードの変更" />
      <Section>
        <div>
          パスワードを変更するには、本人確認が必要です。ご登録のメールアドレスに確認メールを送信します。
        </div>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            sendVerificationCode({
              loginId: userInfo.userName ?? '',
            });
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

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;
export default LoggedInUserForm;
