import React from 'react';
import styled from 'styled-components';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/ButtonStandard';
import MainContainer from '@/shared/components/MainContainer';
import typo from '@/shared/styles/typo';
import PageTitle from '@/shared/components/PageTitle';

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
      <PageTitle text="メールアドレスの変更" />
      <Section>
        <div>
          メールアドレスの確認が完了していません。
          <br />
          もう一度本人確認コードを送信して、メールアドレスの確認を完了してください。
        </div>
      </Section>
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

const Section = styled.div`
  margin: 2rem 0 0;
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
