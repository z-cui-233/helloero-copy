import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import PageTitle from '@/shared/components/PageTitle';

const Inquiry: React.FC = () => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      path: '/',
      text: 'ヘルプセンター',
    },
    {
      path: '/inquiry',
      text: 'お問い合わせ',
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="お問い合わせ" />
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <div>Inquiry</div>
      </MainContainer>
    </LayoutH2u>
  );
};

export default Inquiry;
