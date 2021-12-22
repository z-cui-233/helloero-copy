import { NextPage } from 'next';
import React from 'react';
import Logout from '@/domain/Logout';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.logout.title}
        description={lang.account.meta.logout.description}
      />
      <Logout />
    </React.Fragment>
  );
};

export default Page;
