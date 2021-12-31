import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import { PrismicText } from '@prismicio/react';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces/guide';
import BigBar from '@/shared/components/BigBar';
import typo from '@/shared/styles/typo';
import GuideCard from '@/localShared/components/GuideCard';

interface Props {
  guideCategoryDocument: GuideCategoryDocument;
}

const GuideBrowse: React.FC<Props> = ({ guideCategoryDocument }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="よくある質問" />
      <MainContainer size="large">
        <Title>
          <PrismicText field={guideCategoryDocument.data.title} />
        </Title>
        <List>
          {guideCategoryDocument.data.guide_links.map((doc) => (
            <ListItem key={doc.guide_link.uid}>
              <GuideCard document={doc.guide_link} />
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </LayoutH2u>
  );
};

const Title = styled.h1`
  ${typo.Heading2};
`;

const List = styled.ul`
  margin: 1.5rem 0 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

export default GuideBrowse;
