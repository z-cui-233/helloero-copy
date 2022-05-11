import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import UpdateEmail from '@/domain/UpdateEmail';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="メールアドレスの変更 - H2Uアカウント"
      />
      <UpdateEmail />
    </React.Fragment>
  );
};

export default Page;
