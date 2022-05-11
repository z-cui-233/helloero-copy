import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import SignUp from '@/domain/SignUp';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="アカウント登録 - H2Uアカウント"
      />
      <SignUp />
    </React.Fragment>
  );
};

export default Page;
