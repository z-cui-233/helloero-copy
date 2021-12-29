import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';

const HelpTop: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>HelpTop</MainContainer>
    </LayoutH2u>
  );
};

export default HelpTop;
