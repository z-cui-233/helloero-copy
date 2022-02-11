import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Play from '@/domain/Play';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title="再生 - HELLOERO powered by H2U"
      />
      <Play />
    </React.Fragment>
  );
};

export default Page;
