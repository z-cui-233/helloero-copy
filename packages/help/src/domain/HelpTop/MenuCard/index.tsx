import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import typo from '@/shared/styles/typo';
import ArrowLogo from '@/shared/assets/icon/arrow_right.svg';
import IconGuide from '@/shared/assets/icon/help_guide.svg';
import IconInquiry from '@/shared/assets/icon/help_inquiry.svg';
import IconInfo from '@/shared/assets/icon/help_info.svg';

type UrlPattern = '/guide' | '/info' | '/inquiry';

interface Props {
  url: UrlPattern;
  title: string;
  texts: string;
}

const getIcon = (url: UrlPattern): JSX.Element => {
  switch (url) {
    case '/guide':
      return (
        <Icon>
          <IconGuide />
        </Icon>
      );

    case '/info':
      return (
        <Icon>
          <IconInfo />
        </Icon>
      );

    case '/inquiry':
      return (
        <Icon>
          <IconInquiry />
        </Icon>
      );

    default:
      return (
        <Icon>
          <IconGuide />
        </Icon>
      );
  }
};

const MenuCard: React.FC<Props> = ({ url, title, texts }) => {
  return (
    <Container>
      <Link href={url} passHref>
        <StyledLink>
          {getIcon(url)}
          <Title>{title}</Title>
          <Text>{texts}</Text>
          <Arrow>
            <ArrowLogo />
          </Arrow>
        </StyledLink>
      </Link>
    </Container>
  );
};

const Container = styled.section`
  margin: 1.5rem 0 0;
`;

const StyledLink = styled.a`
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 1.5rem 2.5rem 1.5rem 4.5rem;
  display: block;
  text-decoration: none;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const Title = styled.h2`
  ${typo.Lead1};
`;

const Text = styled.p`
  margin: 0.5rem 0 0;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4.5rem;

  & svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 2.5rem;
    height: 2.5rem;
    opacity: 0.8;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  margin: auto 0;
  opacity: 0.6;
`;

export default MenuCard;
