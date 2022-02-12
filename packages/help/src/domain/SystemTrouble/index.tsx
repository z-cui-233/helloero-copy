import styled from 'styled-components';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { PrismicRichText } from '@prismicio/react';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const SystemTrouble: React.FC<Props> = ({ systemTroubleDocument }) => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },

    {
      path: '/systemtrouble',
      text: '緊急のお知らせ',
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="緊急のお知らせ" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Section>
          <RichTextContainer>
            <PrismicRichText field={systemTroubleDocument.data.text} />
          </RichTextContainer>
        </Section>
      </MainContainer>
    </LayoutH2u>
  );
};

const Section = styled.article`
  margin: 2rem 0 0;
`;

export default SystemTrouble;
