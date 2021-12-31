import * as prismicT from '@prismicio/types';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import InfoCard from './InfoCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces/info';

interface Props {
  infoDocuments: prismicT.Query<InfoDocument>;
}

const InfoList: React.FC<Props> = ({ infoDocuments }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="お知らせ" />
      <MainContainer size="large">
        <ul>
          {infoDocuments.results.map((doc) => (
            <ListItem key={doc.id}>
              <InfoCard infoDocument={doc} />
            </ListItem>
          ))}
        </ul>
      </MainContainer>
    </LayoutH2u>
  );
};

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

export default InfoList;
