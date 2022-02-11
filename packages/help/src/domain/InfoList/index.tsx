import * as prismicT from '@prismicio/types';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import InfoCard from './InfoCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';

type Props = {
  infoDocuments: prismicT.Query<InfoDocument>;
};

const InfoList: React.FC<Props> = ({ infoDocuments }) => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/info',
      text: 'お知らせ',
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title="お知らせ" />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <List>
          {infoDocuments.results.map((doc) => (
            <ListItem key={doc.id}>
              <InfoCard infoDocument={doc} />
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </LayoutH2u>
  );
};

const List = styled.ul`
  margin: 1.5rem 0 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

export default InfoList;
