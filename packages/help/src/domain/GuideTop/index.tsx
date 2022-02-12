import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { PrismicText } from '@prismicio/react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import {
  GuideCategoryDocument,
  GuideTopDocument,
} from '@/localShared/lib/prismic/interfaces';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';
import GuideCard from '@/localShared/components/GuideCard';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  guideTopDocument: GuideTopDocument;
  guideCategoryDocument: GuideCategoryDocument[];
};

const GuideTop: React.FC<Props> = ({
  guideTopDocument,
  guideCategoryDocument,
}) => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/guide',
      text: 'よくある質問',
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="よくある質問" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <div>
          {guideTopDocument.data.category_links.map((doc, index) => (
            <Section key={index}>
              <Title>
                <PrismicText field={doc.category_link.data.title} />
              </Title>
              <List>
                {[...Array(3)].map((_, i) => {
                  const guideDocument =
                    guideCategoryDocument[index].data.guide_links[i];

                  return guideDocument ? (
                    <ListItem key={i}>
                      <GuideCard document={guideDocument.guide_link} />
                    </ListItem>
                  ) : null;
                })}
              </List>
              {guideCategoryDocument[index].data.guide_links.length > 3 && (
                <ReadMore>
                  <Link
                    href={`/guide/browse/${doc.category_link.uid}`}
                    passHref
                  >
                    <a>もっと見る</a>
                  </Link>
                  <ListRightArrow />
                </ReadMore>
              )}
            </Section>
          ))}
        </div>
      </MainContainer>
    </LayoutH2u>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
`;

const Title = styled.h2`
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

const ReadMore = styled.div`
  padding: 1.5rem 2.5rem 1.5rem 1.5rem;
  text-align: right;
  position: relative;

  & a {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`;

export default GuideTop;
