import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import AccountDeletion from '@/domain/AccountDeletion';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="アカウント削除 - H2Uアカウント"
      />
      <AccountDeletion />
    </React.Fragment>
  );
};

export default Page;
