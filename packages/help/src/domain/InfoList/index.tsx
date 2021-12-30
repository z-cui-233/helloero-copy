import * as prismicT from '@prismicio/types';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import InfoCard from './InfoCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';

interface Props {
  prismicData: prismicT.Query<prismicT.PrismicDocument>;
}

const InfoList: React.FC<Props> = ({ prismicData }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="お知らせ" />
      <MainContainer size="large">
        <ul>
          {prismicData?.results?.map((doc) => (
            <ListItem key={doc.id}>
              <InfoCard prismicDocument={doc} />
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
