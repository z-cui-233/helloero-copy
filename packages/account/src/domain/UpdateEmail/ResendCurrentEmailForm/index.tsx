import React from 'react';
import styled from 'styled-components';
import { UseUpdateEmail } from '../useUpdateEmail';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import typo from '@/shared/styles/typo';

type Props = {
  resendCurrentEmail: UseUpdateEmail['resendCurrentEmail'];
  requestNewEmail: UseUpdateEmail['requestNewEmail'];
};

const ResendCurrentEmailForm: React.FC<Props> = ({
  resendCurrentEmail,
  requestNewEmail,
}) => {
  const { lang } = useLocale();

  return (
    <MainContainer>
      <Text>{lang.account.updateEmail.resend.text}</Text>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            resendCurrentEmail();
          }}
          label={lang.account.updateEmail.resend.button}
        />
      </ButtonSection>
      <Skip>
        <SkipButton
          tabIndex={0}
          onClick={() => {
            requestNewEmail();
          }}
        >
          {lang.account.updateEmail.resend.skipButton}
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
