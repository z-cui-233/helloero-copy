import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import IconH2U from '../../../assets/logo/h2uWhite.svg';
import { COMPANY_URL } from '../../../constants/terms';
import device from '../../../styles/device';
import typo from '../../../styles/typo';

type Props = {
  options: Config;
};

const Footer: React.FC<Props> = ({ options }) => (
  <Container>
    <Contents>
      <Logo>
        <IconH2U />
      </Logo>
      <Links>
        <LinkItem>
          <StyledLink href={options.ACCOUNT}>アカウント</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink href={options.HELP}>ヘルプ</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            運営会社
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink
            href={`${options.HELP}/terms`}
            target="_blank"
            rel="noopener noreferrer"
          >
            利用規約
          </StyledLink>
        </LinkItem>
      </Links>
    </Contents>
  </Container>
);

const Container = styled.footer`
  margin: 5rem auto;
  width: 100%;
`;

const Contents = styled.div`
  max-width: 40rem;
  width: calc(100% - 2rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-gap: 1.5rem;
  align-items: center;

  @media ${device.ltTablet} {
    grid-template-columns: 1fr;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    height: 2.5rem;
    width: auto;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LinkItem = styled.div`
  margin: 0 1.5rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.primaryInverted};

  &:hover {
    text-align: underline;
  }
`;

export default Footer;
