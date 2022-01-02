import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

type Props = {
  resetPasswordState: UseResetPassword['resetPasswordState'];
  sendVerificationCode: UseResetPassword['sendVerificationCode'];
};

const LoggedInUserForm: React.FC<Props> = ({
  resetPasswordState,
  sendVerificationCode,
}) => {
  const { lang } = useLocale();
  const { userInfo } = useLoginStateContext();

  return (
    <MainContainer>
      <FormErrorMessage message={resetPasswordState.errorMessage} />
      <Text>{lang.account.resetPassword.send.text}</Text>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            sendVerificationCode({
              loginId: userInfo.cognitoUserInfo?.getUsername() ?? '',
            });
          }}
          label={lang.account.resetPassword.send.button}
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Text = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;
export default LoggedInUserForm;
