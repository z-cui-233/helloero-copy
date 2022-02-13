import React from 'react';
import { globalConfig } from 'src/globalConfig';
import AccountMenus from './AccountMenus';
import SiteMenus from './SiteMenus';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';

const Top: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <SiteMenus />
        <AccountMenus />
      </MainContainer>
    </LayoutH2u>
  );
};

export default Top;
