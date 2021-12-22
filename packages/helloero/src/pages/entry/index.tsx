import { NextPage } from 'next';
import React from 'react';
import Entry from '@/domain/Entry';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';
import { globalConfig } from 'src/globalConfig';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title={lang.helloero.meta.entry.title}
        description={lang.helloero.meta.entry.description}
      />
      <Entry />
    </React.Fragment>
  );
};

export default Page;
