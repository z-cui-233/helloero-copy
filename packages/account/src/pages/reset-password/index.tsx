import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';

import ResetPassword from '@/domain/ResetPassword';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title="パスワードの変更 - H2Uアカウント"
      />
      <ResetPassword />
    </React.Fragment>
  );
};

export default Page;
