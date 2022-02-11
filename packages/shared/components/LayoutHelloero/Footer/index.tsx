import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import IconHelloEro from '../../../assets/logo/helloeroFullWhite.svg';
import { COMPANY_URL, PRIVACY_URL, TERMS_URL } from '../../../constants/terms';
import device from '../../../styles/device';
import typo from '../../../styles/typo';

type Props = {
  options: Config;
};

const Footer: React.FC<Props> = ({ options }) => {
  return (
    <Container>
      <Contents>
        <Logo>
          <IconHelloEro />
        </Logo>
        <div>
          <Links>
            <LinkItem>
              <StyledLink
                href={options.ACCOUNT}
                target="_blank"
                rel="noopener noreferrer"
              >
                アカウント
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink
                href={options.HELP}
                target="_blank"
                rel="noopener noreferrer"
              >
                ヘルプ
              </StyledLink>
            </LinkItem>
          </Links>
          <Links>
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
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                個人情報保護方針
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink
                href={TERMS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                利用規約
              </StyledLink>
            </LinkItem>
          </Links>
        </div>
      </Contents>
    </Container>
  );
};

const Container = styled.footer`
  margin: 5rem auto;
  width: 100%;
`;

const Contents = styled.div`
  max-width: 46rem;
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
  height: 100%;

  & > svg {
    height: 2.5rem;
    width: auto;
    display: block;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin: 1rem 0 0;
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
