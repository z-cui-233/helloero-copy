import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { setCookie } from 'nookies';
import React, { useEffect } from 'react';
import { globalConfig } from 'src/globalConfig';
import { cookieParams } from '@/shared/constants/cookies';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const wabiken = router.query.wabiken
      ? (router.query.wabiken as string)
      : '';

    if (wabiken) {
      setCookie(null, cookieParams.wabiken.name, wabiken, {
        domain: globalConfig.COOKIE_DOMAIN,
        path: cookieParams.wabiken.path,
        secure: cookieParams.wabiken.secure,
        httpOnly: cookieParams.wabiken.httpOnly,
      });
    }

    router.replace(`/${router.locale}/entry/flow`);
  }, [router]);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title="HELLOERO powered by H2U"
        description="シンプルに、カジュアルに。アダルトコンテンツを楽しもう。ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。"
      />
      <div />;
    </React.Fragment>
  );
};

export default Page;
