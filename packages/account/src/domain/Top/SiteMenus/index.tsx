import Link from 'next/link';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import styled from 'styled-components';
import LogoHelloero from '@/shared/assets/logo/helloeroBlack.svg';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';

const SiteMenus: React.FC = () => {
  return (
    <Container>
      <Title>サービス</Title>
      <Link href={globalConfig.HELLOERO} passHref>
        <ServiceCard>
          <ServiceName>
            シンプルに、カジュアルに。
            <br />
            アダルトコンテンツを楽しもう。
          </ServiceName>
          <ServiceLogo>
            <LogoHelloero />
          </ServiceLogo>
        </ServiceCard>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0 0;
`;

const Title = styled.div`
  ${typo.Lead1};
  padding: 0 0 0 1rem;
`;

const ServiceCard = styled.a`
  display: block;
  margin: 1rem 0 0;
  border: 1px solid ${({ theme }) => theme.background.quinary};
  border-radius: 0.2rem;
  padding: 2rem 1rem;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-gap: 1.5rem;
  align-items: center;
  transition: background-color 0.1s ease-out;

  @media ${device.ltTablet} {
    grid-template-columns: 1fr;
  }

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

const ServiceName = styled.div`
  ${typo.Lead2};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
`;

const ServiceLogo = styled.div`
  & > svg {
    max-width: 20rem;
  }
`;

export default SiteMenus;
