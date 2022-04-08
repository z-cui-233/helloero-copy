import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import EntryFlow from '@/domain/EntryFlow';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title="コード入力 - HELLO ERO powered by H2U"
      />
      <EntryFlow />
    </React.Fragment>
  );
};

export default Page;
