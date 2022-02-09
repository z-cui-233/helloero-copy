import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import typo from '../../../styles/typo';
import IconH2U from '../../../assets/logo/h2uWhite.svg';
import device from '../../../styles/device';
import { COMPANY_URL, PRIVACY_URL, TERMS_URL } from '../../../constants/terms';
import { useLocale } from '../../../context/LocaleContext';

type Props = {
  options: Config;
};

const Footer: React.FC<Props> = ({ options }) => {
  const { lang } = useLocale();

  return (
    <Container>
      <Contents>
        <Logo>
          <IconH2U />
        </Logo>
        <Links>
          <LinkItem>
            <StyledLink
              href={options.HELP}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.footer.help}
            </StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.footer.company}
            </StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.footer.privacy}
            </StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.account.footer.terms}
            </StyledLink>
          </LinkItem>
        </Links>
      </Contents>
    </Container>
  );
};

const Container = styled.footer`
  margin: 5rem auto;
  width: 100%;
`;

const Contents = styled.div`
  max-width: 40rem;
  width: calc(100% - 2rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 33% 1fr;
  grid-gap: 1.5rem;
  align-items: center;

  @media ${device.ltTablet} {
    grid-template-columns: 1fr;
  }
`;

const Logo = styled.div`
  & > svg {
    height: 2.5rem;
    width: auto;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;

  @media ${device.ltTablet} {
    justify-content: flex-start;
  }
`;

const LinkItem = styled.div`
  & + & {
    margin: 0 0 0 0.5rem;
  }
`;

const StyledLink = styled.a`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.primaryInverted};
`;

export default Footer;
