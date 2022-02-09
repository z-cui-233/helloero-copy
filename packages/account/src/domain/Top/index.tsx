import React from 'react';
import { globalConfig } from 'src/globalConfig';
import AccountMenus from './AccountMenus';
import SiteMenus from './SiteMenus';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

const Top: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <SiteMenus />
        {isLoadedUserInfo && userInfo.isLoggedIn && <AccountMenus />}
      </MainContainer>
    </LayoutH2u>
  );
};

export default Top;
