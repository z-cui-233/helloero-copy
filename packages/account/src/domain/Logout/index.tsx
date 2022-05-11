import Link from 'next/link';
import { globalConfig } from 'src/globalConfig';
import styled from 'styled-components';
import ButtonStandard from '@/shared/components/ButtonStandard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import typo from '@/shared/styles/typo';
import useLogoutChallenge, { PAGE_STATUS } from './useLogoutChallenge';

const Logout: React.FC = () => {
  const { logoutChallengeState, invokeLogOut } = useLogoutChallenge();

  return (
    <LayoutH2u options={globalConfig}>
      {logoutChallengeState.pageStatus === PAGE_STATUS.CONFIRM ? (
        <MainContainer>
          <PageTitle text="ログアウト" />
          <Section>
            <div>
              H2Uからログアウトしますか？
              <br />
              再度ログインするには、ログインIDとパスワードが必要です。
            </div>
          </Section>
          <ButtonSection>
            <ButtonStandard
              onClick={() => {
                invokeLogOut();
              }}
              label="ログアウト"
            />
            <Link href="/" passHref>
              <StyledLink>キャンセル</StyledLink>
            </Link>
          </ButtonSection>
        </MainContainer>
      ) : null}
    </LayoutH2u>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
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
