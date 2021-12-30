import React from 'react';
import { globalConfig } from 'src/globalConfig';
import * as prismicT from '@prismicio/types';
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

interface Props {
  prismicData: prismicT.PrismicDocument;
}

const InfoDetail: React.FC<Props> = ({ prismicData }) => {
  const { locale } = useLocale();

  const date = prismicH.asDate(
    prismicData.data.publish_date as prismicT.DateField
  );

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="お知らせ" />
      <MainContainer size="large">
        <article>
          <ReleaseDate>{convertDateToString(locale, date)}</ReleaseDate>
          <Title>
            <PrismicText
              field={prismicData.data.title as prismicT.RichTextField}
            />
          </Title>
          <RichTextContainer>
            <PrismicRichText
              field={prismicData.data.detail as prismicT.RichTextField}
            />
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
  margin: 0.5rem 0 3rem;
`;

export default InfoDetail;
