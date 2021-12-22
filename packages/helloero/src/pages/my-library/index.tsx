import { NextPage } from 'next';
import React from 'react';
import MyLibrary from '@/domain/MyLibrary';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';
import { globalConfig } from 'src/globalConfig';

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
