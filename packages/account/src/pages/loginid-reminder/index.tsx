import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LoginIdReminder from '@/domain/LoginIdReminder';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => (
  <React.Fragment>
    <MetaTags
      host={globalConfig.ACCOUNT}
      title="ログインIDの確認 - H2Uアカウント"
    />
    <LoginIdReminder />
  </React.Fragment>
);

export default Page;
