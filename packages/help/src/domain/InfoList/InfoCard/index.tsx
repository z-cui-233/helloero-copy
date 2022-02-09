import { PrismicText } from '@prismicio/react';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';
import { convertDateToString } from '@/shared/utils';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import ListRightArrow from '@/shared/components/ListRightArrow';

type Props = {
  infoDocument: InfoDocument;
};

const InfoCard: React.FC<Props> = ({ infoDocument }) => {
  const { locale } = useLocale();

  const date = prismicH.asDate(infoDocument.data.publish_date);

  return (
    <Link href={`/${locale}/info/${infoDocument.uid}`} passHref>
      <Container>
        <article>
          <ReleaseDate>{convertDateToString(locale, date)}</ReleaseDate>
          <Title>
            <PrismicText field={infoDocument.data.title} />
          </Title>
        </article>
        <ListRightArrow />
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: block;
  padding: 1rem 2.5rem 1rem 1rem;
  line-height: 1.6;
  text-decoration: none;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const ReleaseDate = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.secondary};
`;

const Title = styled.h2`
  ${typo.Standard};
  margin: 0.25rem 0 0;
`;

export default InfoCard;
