import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Top from '@/domain/Top';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title="HELLO ERO powered by H2U"
        description="シンプルに、カジュアルに。アダルトコンテンツを楽しもう。ようこそ、HELLO ERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。"
      />
      <Top />
    </React.Fragment>
  );
};

export default Page;
