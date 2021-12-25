import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import ResendSignUp from '@/domain/ResendSignUp';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.resendSignUp.title}
        description={lang.account.meta.resendSignUp.description}
      />
      <ResendSignUp />
    </React.Fragment>
  );
};

export default Page;
