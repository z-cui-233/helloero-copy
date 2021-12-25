import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Top from '@/domain/Top';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.default.title}
        description={lang.help.meta.default.description}
      />
      <Top />
    </React.Fragment>
  );
};

export default Page;
