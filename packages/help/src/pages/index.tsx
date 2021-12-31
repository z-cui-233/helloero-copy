import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import HelpTop from '@/domain/HelpTop';
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
        isMultiLang={false}
      />
      <HelpTop />
    </React.Fragment>
  );
};

export default Page;
