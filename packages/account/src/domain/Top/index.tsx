import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import AccountMenus from './AccountMenus';
import LoginButton from './LoginButton';
import SiteMenus from './SiteMenus';

const Top: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <LayoutH2u options={globalConfig} needLogin={false}>
      {isLoadedUserInfo && (
        <MainContainer>
          {userInfo.isLoggedIn && <AccountMenus />}
          <SiteMenus />
          {!userInfo.isLoggedIn && <LoginButton />}
        </MainContainer>
      )}
    </LayoutH2u>
  );
};

export default Top;
