import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import PretestPlayback from '@/domain/PretestPlayback';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title="視聴環境の動作確認 - HELLO ERO powered by H2U"
        description="購入前に動画が再生できるか確認してください。"
      />
      <PretestPlayback />
    </React.Fragment>
  );
};

export default Page;
