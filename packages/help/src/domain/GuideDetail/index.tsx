import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import styled from 'styled-components';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  guideDocument: GuideDocument;
};

const GuideDetail: React.FC<Props> = ({ guideDocument }) => {
  const title = prismicH.asText(guideDocument.data.question) ?? '';

  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/guide',
      text: 'よくある質問',
    },
    {
      path: `/guide/detail/${guideDocument.uid}`,
      text: title as string,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text={title} />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Section>
          <RichTextContainer>
            <PrismicRichText field={guideDocument.data.answer} />
          </RichTextContainer>
        </Section>
      </MainContainer>
    </LayoutH2u>
  );
};

const Section = styled.article`
  margin: 3rem 0 0;
`;

export default GuideDetail;
