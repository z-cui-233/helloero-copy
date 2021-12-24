import Link from 'next/link';
import typo from '@/shared/styles/typo';
import styled from 'styled-components';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import { globalConfig } from 'src/globalConfig';
import useLogoutChallenge, { PAGE_STATUS } from './useLogoutChallenge';
import LayoutH2u from '@/shared/components/LayoutH2u';

const Logout: React.FC = () => {
  const { logoutChallengeState, invokeLogOut } = useLogoutChallenge();
  const { locale, lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      {logoutChallengeState.pageStatus === PAGE_STATUS.CONFIRM ? (
        <MainContainer>
          <Title>{lang.account.logout.title}</Title>
          <Text>{lang.account.logout.text}</Text>
          <ButtonSection>
            <ButtonStandard
              onClick={() => {
                invokeLogOut();
              }}
              label={lang.account.logout.button}
            />
            <Link href={`/${locale}`} passHref>
              <StyledLink>{lang.account.logout.cancel}</StyledLink>
            </Link>
          </ButtonSection>
        </MainContainer>
      ) : null}
    </LayoutH2u>
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

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  text-decoration: underline;
  display: inline-block;
  margin: 1.5rem auto 0;
`;

export default Logout;
