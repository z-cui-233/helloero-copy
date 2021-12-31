import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { PrismicText, PrismicRichText } from '@prismicio/react';
import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import MainContainer from '@/shared/components/parts/MainContainer';
import LayoutH2u from '@/shared/components/LayoutH2u';
import typo from '@/shared/styles/typo';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { convertDateToString } from '@/shared/utils';
import { useLocale } from '@/shared/context/LocaleContext';
import BigBar from '@/shared/components/BigBar';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces/info';

interface Props {
  infoDocument: InfoDocument;
}

const InfoDetail: React.FC<Props> = ({ infoDocument }) => {
  const { locale } = useLocale();

  const date = prismicH.asDate(infoDocument.data.publish_date);

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="お知らせ" />
      <MainContainer size="large">
        <article>
          <ReleaseDate>{convertDateToString(locale, date)}</ReleaseDate>
          <Title>
            <PrismicText field={infoDocument.data.title} />
          </Title>
          <RichTextContainer>
            <PrismicRichText field={infoDocument.data.text} />
          </RichTextContainer>
        </article>
      </MainContainer>
    </LayoutH2u>
  );
};

const ReleaseDate = styled.div`
  ${typo.Body};
  font-weight: bold;
  color: ${({ theme }) => theme.foreground.secondary};
`;

const Title = styled.h1`
  ${typo.Heading2};
  margin: 0.5rem 0 2rem;
`;

export default InfoDetail;
