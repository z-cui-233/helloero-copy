import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import IconGuide from '@/shared/assets/icon/help_guide.svg';
import IconInfo from '@/shared/assets/icon/help_info.svg';
import IconInquiry from '@/shared/assets/icon/help_inquiry.svg';
import ListRightArrow from '@/shared/components/ListRightArrow';
import typo from '@/shared/styles/typo';

type UrlPattern = 'guide' | 'info' | 'inquiry';

type Props = {
  urlPattern: UrlPattern;
  title: string;
  texts: string;
};

const getIcon = (urlPattern: UrlPattern): JSX.Element => {
  switch (urlPattern) {
    case 'guide':
      return (
        <Icon>
          <IconGuide />
        </Icon>
      );

    case 'info':
      return (
        <Icon>
          <IconInfo />
        </Icon>
      );

    case 'inquiry':
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

const MenuCard: React.FC<Props> = ({ urlPattern, title, texts }) => {
  return (
    <Container>
      <Link href={`/${urlPattern}`} passHref>
        <StyledLink>
          {getIcon(urlPattern)}
          <Title>{title}</Title>
          <Text>{texts}</Text>
          <ListRightArrow />
        </StyledLink>
      </Link>
    </Container>
  );
};

const Container = styled.section`
  margin: 1.5rem 0 0;
`;

const StyledLink = styled.a`
  border: 1px solid ${({ theme }) => theme.background.quinary};
  border-radius: 0.2rem;
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
  ${typo.Lead2};
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

export default MenuCard;
