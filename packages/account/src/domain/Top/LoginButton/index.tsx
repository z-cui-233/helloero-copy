import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';

const LoginButton: React.FC = () => (
  <Container>
    <Link href="/login" passHref>
      <StyledLink>
        <div>ログイン</div>
      </StyledLink>
    </Link>
  </Container>
);

const Container = styled.div`
  margin: 4rem 0 0;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  height: 3.5rem;
  margin: auto 0;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 1rem;
  text-decoration: none;
  max-width: 15rem;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`;

export default LoginButton;
