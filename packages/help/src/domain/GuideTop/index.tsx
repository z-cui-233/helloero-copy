import React from 'react';
import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import {
  GuideCategoryDocument,
  GuideTopDocument,
} from '@/localShared/lib/prismic/interfaces';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';
import ArrowTextLink from '@/shared/components/ArrowTextLink';
import LinkList, { LinkListItemData } from '@/localShared/components/LinkList';

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
          {guideTopDocument.data.category_links.map((doc, index) => {
            const title = prismicH.asText(doc.category_link.data.title) ?? '';
            const linkListData: LinkListItemData[] = [...Array(3)]
              .map((_, i) => {
                const guideDocument =
                  guideCategoryDocument[index].data.guide_links[i];

                return (
                  guideDocument && {
                    url: `/guide/detail/${guideDocument.guide_link.uid}`,
                    title:
                      prismicH.asText(guideDocument.guide_link.data.question) ??
                      '',
                  }
                );
              })
              .filter((e) => typeof e !== 'undefined');

            return (
              <div key={index}>
                <LinkList title={title} data={linkListData} />
                {guideCategoryDocument[index].data.guide_links.length > 3 && (
                  <ReadMore>
                    <ArrowTextLink
                      href={`/guide/browse/${doc.category_link.uid}`}
                      text="もっと見る"
                    />
                  </ReadMore>
                )}
              </div>
            );
          })}
        </div>
      </MainContainer>
    </LayoutH2u>
  );
};

const ReadMore = styled.div`
  margin: 1rem 0 0;
  padding: 0 1rem 0 0;
  text-align: right;
`;

export default GuideTop;
