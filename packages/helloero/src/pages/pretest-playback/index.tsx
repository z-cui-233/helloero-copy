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
        title="HELLOERO powered by H2U"
        description="シンプルに、カジュアルに。アダルトコンテンツを楽しもう。ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。"
      />
      <PretestPlayback />
    </React.Fragment>
  );
};

export default Page;
