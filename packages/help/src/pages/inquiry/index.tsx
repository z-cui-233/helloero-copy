import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MetaTags from '@/shared/components/MetaTags';
import Inquiry from '@/domain/Inquiry';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="お問い合わせ - H2U ヘルプセンター"
      />
      <Inquiry />
    </React.Fragment>
  );
};

export default Page;
