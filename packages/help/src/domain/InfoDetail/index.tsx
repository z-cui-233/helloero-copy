import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import styled from 'styled-components';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import typo from '@/shared/styles/typo';
import { convertDateToString } from '@/shared/utils';

type Props = {
  infoDocument: InfoDocument;
};

const InfoDetail: React.FC<Props> = ({ infoDocument }) => {
  const date = prismicH.asDate(infoDocument.data.publish_date);
  const title = prismicH.asText(infoDocument.data.title) ?? '';

  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/info',
      text: 'お知らせ',
    },
    {
      path: `/info/${infoDocument.uid}`,
      text: title as string,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <ReleaseDate>{convertDateToString(date)}</ReleaseDate>
        <PageTitle text={title} />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Section>
          <RichTextContainer>
            <PrismicRichText field={infoDocument.data.text} />
          </RichTextContainer>
        </Section>
      </MainContainer>
    </LayoutH2u>
  );
};

const Section = styled.article`
  margin: 3rem 0 0;
`;

const ReleaseDate = styled.div`
  ${typo.Body};
  font-weight: bold;
  color: ${({ theme }) => theme.foreground.secondary};
`;

export default InfoDetail;
