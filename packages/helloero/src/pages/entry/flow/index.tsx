import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import EntryFlow from '@/domain/EntryFlow';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELLOERO}
        title={lang.helloero.meta.entry.title}
        description={lang.helloero.meta.entry.description}
      />
      <EntryFlow />
    </React.Fragment>
  );
};

export default Page;
