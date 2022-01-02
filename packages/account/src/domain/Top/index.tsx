import React from 'react';
import { globalConfig } from 'src/globalConfig';
import AccountMenus from './AccountMenus';
import SiteMenus from './SiteMenus';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import { useLocale } from '@/shared/context/LocaleContext';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

const Top: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar
        size="large"
        title={lang.account.top.title}
        subText={
          userInfo.isLoggedIn
            ? lang.account.top.subText.replace(
                '{loginId}',
                userInfo.cognitoUserInfo?.getUsername() ?? ''
              )
            : ''
        }
      />
      <MainContainer size="large">
        {isLoadedUserInfo && (
          <React.Fragment>
            <AccountMenus />
            <SiteMenus />
          </React.Fragment>
        )}
      </MainContainer>
    </LayoutH2u>
  );
};

export default Top;
