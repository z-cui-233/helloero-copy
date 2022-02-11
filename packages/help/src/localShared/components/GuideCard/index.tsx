import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { PrismicText } from '@prismicio/react';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces';
import ListRightArrow from '@/shared/components/ListRightArrow';

type Props = {
  document: GuideDocument;
};

const GuideCard: React.FC<Props> = ({ document }) => {
  return (
    <Link passHref href={`/guide/detail/${document.uid}`}>
      <Container>
        <PrismicText field={document.data.question} />
        <ListRightArrow />
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: block;
  padding: 1rem 2.5rem 1rem 1rem;
  text-decoration: none;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

export default GuideCard;
