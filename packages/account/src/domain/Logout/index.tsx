import Link from 'next/link';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import useLogoutChallenge, { PAGE_STATUS } from './useLogoutChallenge';
import typo from '@/shared/styles/typo';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import LayoutH2u from '@/shared/components/LayoutH2u';
import BigBar from '@/shared/components/BigBar';

const Logout: React.FC = () => {
  const { logoutChallengeState, invokeLogOut } = useLogoutChallenge();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title="ログアウト" />
      {logoutChallengeState.pageStatus === PAGE_STATUS.CONFIRM ? (
        <MainContainer>
          <Text>
            H2Uからログアウトしますか？再度ログインするには、ログインIDとパスワードが必要です。
          </Text>
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
