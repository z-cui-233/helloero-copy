import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';

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
      <BigBar title="お問い合わせ" />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <div>Inquiry</div>
      </MainContainer>
    </LayoutH2u>
  );
};

export default Inquiry;
