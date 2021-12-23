import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import UpdateEmail from '@/domain/UpdateEmail';
import { useLocale } from '@/shared/context/LocaleContext';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.updateEmail.title}
        description={lang.account.meta.updateEmail.description}
      />
      <UpdateEmail />
    </React.Fragment>
  );
};

export default Page;
