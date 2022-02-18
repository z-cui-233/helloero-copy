import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Login from '@/domain/Login';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags host={globalConfig.ACCOUNT} title="ログイン - H2Uアカウント" />
      <Login />
    </React.Fragment>
  );
};

export default Page;
