import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import typo from '@/shared/styles/typo';
import Logo from '@/shared/assets/logo/helloeroBlack.svg';
import { useLocale } from '@/shared/context/LocaleContext';

const CardHelloero: React.FC = () => {
  const { lang } = useLocale();

  return (
    <Container>
      <StyledLink href={globalConfig.HELLOERO}>
        <LogoBox>
          <Logo />
        </LogoBox>
        <Text>{lang.account.top.service.helloero}</Text>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  margin: 1rem 0 0;
`;

const StyledLink = styled.a`
  padding: 1.5rem;
  display: block;
  text-decoration: none;
  transition: background-color 0.1s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const Text = styled.div`
  margin: 1rem 0 0;
  ${typo.Lead2};
`;

const LogoBox = styled.div`
  & svg {
    width: 20rem;
    max-width: 100%;
  }
`;

export default CardHelloero;
