import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';
import UpdateEmail from '@/domain/UpdateEmail';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.logout.title}
        description={lang.account.meta.logout.description}
      />
      <UpdateEmail />
    </React.Fragment>
  );
};

export default Page;
