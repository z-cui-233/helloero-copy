import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import SignUp from '@/domain/SignUp';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.signUp.title}
        description={lang.account.meta.signUp.description}
      />
      <SignUp />
    </React.Fragment>
  );
};

export default Page;
