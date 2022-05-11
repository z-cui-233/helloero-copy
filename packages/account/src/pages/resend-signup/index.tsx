import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import ResendSignUp from '@/domain/ResendSignUp';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="アカウント登録の再開 - H2Uアカウント"
      />
      <ResendSignUp />
    </React.Fragment>
  );
};

export default Page;
