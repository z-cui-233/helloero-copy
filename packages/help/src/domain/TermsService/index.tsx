import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';

const TermsService: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title="利用規約" />
      <MainContainer>TermsService</MainContainer>
    </LayoutH2u>
  );
};

export default TermsService;
