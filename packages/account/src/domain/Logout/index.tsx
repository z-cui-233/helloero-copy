import Link from 'next/link';
import withLayout from '@/shared/components/Layout';
import typo from '@/shared/styles/typo';
import styled from 'styled-components';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import { globalConfig } from 'src/globalConfig';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import useLogout from './useLogout';

const Logout: React.FC = () => {
  const { invokeLogOut, isLoading } = useLogout();
  const { locale, lang } = useLocale();

  return (
    <MainContainer>
      <Title>{lang.account.logout.title}</Title>
      <Text>{lang.account.logout.text}</Text>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            invokeLogOut();
          }}
          label={lang.account.logout.button}
          disabled={isLoading}
        />
        <Link href={`/${locale}`} passHref>
          <StyledLink>{lang.account.logout.cancel}</StyledLink>
        </Link>
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

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  text-decoration: underline;
  display: inline-block;
  margin: 1.5rem auto 0;
`;

export default withLayout(withAmplifyAuth(Logout, globalConfig), globalConfig);
