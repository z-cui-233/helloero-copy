import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Top from '@/domain/Top';
import { useLocale } from '@/shared/context/LocaleContext';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title={lang.helloero.meta.default.title}
        description={lang.helloero.meta.default.description}
      />
      <Top />
    </React.Fragment>
  );
};

export default Page;
