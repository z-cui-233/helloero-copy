import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import HelpTop from '@/domain/HelpTop';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="H2U ヘルプセンター"
        description="H2Uのヘルプセンターです。ヘルプページをお探しの方はこちらをご覧ください。"
      />
      <HelpTop />
    </React.Fragment>
  );
};

export default Page;
