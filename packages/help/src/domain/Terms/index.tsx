import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import LinkList, { LinkListItemData } from '@/localShared/components/LinkList';
import { PRIVACY_URL } from '@/shared/constants/terms';

const Terms: React.FC = () => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/terms',
      text: '利用規約',
    },
  ];

  const linkListData: LinkListItemData[] = [
    {
      url: '/terms/service',
      title: 'HelloEROサービス利⽤規約',
    },
    {
      url: '/terms/account',
      title: 'H2Uアカウント利用規約',
    },
    {
      url: PRIVACY_URL,
      title: '個人情報保護方針',
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="利用規約" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <LinkList data={linkListData} />
      </MainContainer>
    </LayoutH2u>
  );
};

export default Terms;
