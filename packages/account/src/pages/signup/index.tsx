import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import SignUp from '@/domain/SignUp';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags host={globalConfig.ACCOUNT} title={''} description={''} />
      <SignUp />
    </React.Fragment>
  );
};

export default Page;
