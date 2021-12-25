import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Login from '@/domain/Login';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.login.title}
        description={lang.account.meta.login.description}
      />
      <Login />
    </React.Fragment>
  );
};

export default Page;
