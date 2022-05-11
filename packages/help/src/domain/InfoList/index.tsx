import * as prismicH from '@prismicio/helpers';
import * as prismicT from '@prismicio/types';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import LinkList, { LinkListItemData } from '@/localShared/components/LinkList';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import { convertDateToString } from '@/shared/utils';

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

  const linkListData: LinkListItemData[] = infoDocuments.results.map((doc) => {
    const date = prismicH.asDate(doc.data.publish_date);
    const title = prismicH.asText(doc.data.title) ?? '';

    return {
      url: `/info/${doc.uid}`,
      preTitle: convertDateToString(date),
      title,
    };
  });

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="お知らせ" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <LinkList data={linkListData} />
      </MainContainer>
    </LayoutH2u>
  );
};

export default InfoList;
