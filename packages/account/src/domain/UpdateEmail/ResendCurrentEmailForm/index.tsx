import React from 'react';
import styled from 'styled-components';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import typo from '@/shared/styles/typo';

type Props = {
  resendCurrentEmail: UseUpdateEmail['resendCurrentEmail'];
  requestNewEmail: UseUpdateEmail['requestNewEmail'];
};

const ResendCurrentEmailForm: React.FC<Props> = ({
  resendCurrentEmail,
  requestNewEmail,
}) => {
  return (
    <MainContainer>
      <Text>
        メールアドレスの確認が完了していません。もう一度本人確認コードを送信してしてください。
      </Text>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            resendCurrentEmail();
          }}
          label="本人確認コードを送信"
        />
      </ButtonSection>
      <Skip>
        <SkipButton
          tabIndex={0}
          onClick={() => {
            requestNewEmail();
          }}
        >
          別のメールアドレスを登録
        </SkipButton>
      </Skip>
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

const Skip = styled.div`
  margin: 1.5rem 0 0;
  display: flex;
  justify-content: center;
`;

const SkipButton = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  text-decoration: underline;
  cursor: pointer;
`;

export default ResendCurrentEmailForm;
