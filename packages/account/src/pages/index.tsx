import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Top from '@/domain/Top';

import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="H2Uアカウント"
        description="H2Uアカウントの登録、ログイン、各種設定を行えます。"
      />
      <Top />
    </React.Fragment>
  );
};

export default Page;
