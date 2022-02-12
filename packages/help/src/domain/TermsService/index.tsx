import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import PageTitle from '@/shared/components/PageTitle';

const TermsService: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="利用規約" />
      </MainContainer>
    </LayoutH2u>
  );
};

export default TermsService;
