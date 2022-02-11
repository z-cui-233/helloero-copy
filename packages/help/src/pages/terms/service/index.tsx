import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import TermsService from '@/domain/TermsService';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="サービス規約 - H2U ヘルプセンター"
      />
      <TermsService />
    </React.Fragment>
  );
};

export default Page;
