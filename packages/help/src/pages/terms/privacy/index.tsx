import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import TermsPrivacy from '@/domain/TermsPrivacy';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.termsPrivacy.title}
        description={lang.help.meta.termsPrivacy.description}
        isMultiLang={false}
      />
      <TermsPrivacy />
    </React.Fragment>
  );
};

export default Page;
