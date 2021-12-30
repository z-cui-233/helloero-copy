import { PrismicText } from '@prismicio/react';
import * as prismicT from '@prismicio/types';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';
import { convertDateToString } from '@/shared/utils';

interface Props {
  prismicDocument: prismicT.PrismicDocument;
}

const InfoCard: React.FC<Props> = ({ prismicDocument }) => {
  const { locale } = useLocale();

  const date = prismicH.asDate(
    prismicDocument.data.publish_date as prismicT.DateField
  );

  return (
    <Link href={`/${locale}/info/${prismicDocument.uid}`} passHref>
      <Container>
        <article>
          <ReleaseDate>{convertDateToString(locale, date)}</ReleaseDate>
          <Title>
            <PrismicText
              field={prismicDocument.data.title as prismicT.RichTextField}
            />
          </Title>
        </article>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: block;
  padding: 1rem;
  line-height: 1.6;
  text-decoration: none;
  transition: background-color 0.1s ease-out;

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
