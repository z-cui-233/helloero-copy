import { NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Terms from '@/domain/Terms';
import MetaTags from '@/shared/components/MetaTags';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="利用規約 - H2U ヘルプセンター"
      />
      <Terms />
    </React.Fragment>
  );
};

export default Page;
