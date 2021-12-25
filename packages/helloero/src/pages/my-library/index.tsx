import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MyLibrary from '@/domain/MyLibrary';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title={lang.helloero.meta.default.title}
        description={lang.helloero.meta.default.description}
      />
      <MyLibrary />
    </React.Fragment>
  );
};

export default Page;
