import React from 'react';
import styled from 'styled-components';
import { UseResetPassword } from '../../useResetPassword';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import typo from '@/shared/styles/typo';

const LoggedInUserForm: React.FC<UseResetPassword> = (props) => {
  const { lang } = useLocale();
  const { userInfo } = useLoginStateContext();

  return (
    <MainContainer>
      <FormErrorMessage message={props.resetPasswordState.errorMessage} />
      <Title>{lang.account.resetPassword.send.title}</Title>
      <Text>{lang.account.resetPassword.send.text}</Text>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            props.sendVerificationCode({
              userName: userInfo.userInfo?.username as string,
            });
          }}
          label={lang.account.resetPassword.send.button}
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;
export default LoggedInUserForm;
