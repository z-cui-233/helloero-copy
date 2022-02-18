import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';
import LinkList, { LinkListItemData } from '@/localShared/components/LinkList';

type Props = {
  guideCategoryDocument: GuideCategoryDocument;
};

const GuideBrowse: React.FC<Props> = ({ guideCategoryDocument }) => {
  const title = prismicH.asText(guideCategoryDocument.data.title) ?? '';

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

  const linkListData: LinkListItemData[] =
    guideCategoryDocument.data.guide_links.map((doc) => ({
      url: `/guide/detail/${doc.guide_link.uid}`,
      title: prismicH.asText(doc.guide_link.data.question) ?? '',
    }));

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="よくある質問" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <LinkList title={title} data={linkListData} />
      </MainContainer>
    </LayoutH2u>
  );
};

export default GuideBrowse;
