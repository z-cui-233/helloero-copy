import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import ResendSignUp from '@/domain/ResendSignUp';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags host={globalConfig.ACCOUNT} title={''} description={''} />
      <ResendSignUp />
    </React.Fragment>
  );
};

export default Page;
