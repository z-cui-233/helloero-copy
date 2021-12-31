import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';
import Inquiry from '@/domain/Inquiry';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.inquiry.title}
        description={lang.help.meta.inquiry.description}
        isMultiLang={false}
      />
      <Inquiry />
    </React.Fragment>
  );
};

export default Page;
