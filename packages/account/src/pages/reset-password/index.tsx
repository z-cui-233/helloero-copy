import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';
import ResetPassword from '@/domain/ResetPassword';

const Page: NextPage = () => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.ACCOUNT}
        title={lang.account.meta.resetPassword.title}
        description={lang.account.meta.resetPassword.description}
      />
      <ResetPassword />
    </React.Fragment>
  );
};

export default Page;
