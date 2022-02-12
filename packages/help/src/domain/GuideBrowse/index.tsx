import React from 'react';
import styled from 'styled-components';
import { PrismicText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces';
import typo from '@/shared/styles/typo';
import GuideCard from '@/localShared/components/GuideCard';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  guideCategoryDocument: GuideCategoryDocument;
};

const GuideBrowse: React.FC<Props> = ({ guideCategoryDocument }) => {
  const title = prismicH.asText(guideCategoryDocument.data.title);

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
      path: '/guide/browse/${guideCategoryDocument.uid}',
      text: title as string,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="よくある質問" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Section>
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
        </Section>
      </MainContainer>
    </LayoutH2u>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
`;

const Title = styled.h1`
  ${typo.Lead1};
`;

const List = styled.ul`
  margin: 1rem 0 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

export default GuideBrowse;
