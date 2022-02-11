import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Logout from '@/domain/Logout';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="ログアウト - H2Uアカウント"
      />
      <Logout />
    </React.Fragment>
  );
};

export default Page;
