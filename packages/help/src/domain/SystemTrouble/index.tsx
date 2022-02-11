import styled from 'styled-components';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { PrismicRichText } from '@prismicio/react';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import BigBar from '@/shared/components/BigBar';
import MainContainer from '@/shared/components/parts/MainContainer';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';

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
      <BigBar title="緊急のお知らせ" />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Container>
          <RichTextContainer>
            <PrismicRichText field={systemTroubleDocument.data.text} />
          </RichTextContainer>
        </Container>
      </MainContainer>
    </LayoutH2u>
  );
};

const Container = styled.article`
  margin: 1.5rem 0 0;
`;

export default SystemTrouble;
