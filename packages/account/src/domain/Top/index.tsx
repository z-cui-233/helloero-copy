import React from 'react';
import { globalConfig } from 'src/globalConfig';
import H2uServices from './H2uServices';
import SiteMenus from './SiteMenus';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';

const Top: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer size="large">
        <H2uServices />
        <SiteMenus />
      </MainContainer>
    </LayoutH2u>
  );
};

export default Top;
