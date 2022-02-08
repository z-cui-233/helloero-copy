import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import TermsService from '@/domain/TermsService';
import { useLocale } from '@/shared/context/LocaleContext';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.termsService.title}
        description={lang.help.meta.termsService.description}
      />
      <TermsService />
    </React.Fragment>
  );
};

export default Page;
