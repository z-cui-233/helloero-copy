import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import HelpTop from '@/domain/HelpTop';
import MetaTags from '@/shared/components/MetaTags';
import { fetchSystemTroubleByUid } from '@/localShared/lib/prismic';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const Page: NextPage<Props> = ({ systemTroubleDocument }) => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="H2U ヘルプセンター"
        description="H2Uのヘルプセンターです。ヘルプページをお探しの方はこちらをご覧ください。"
      />
      <HelpTop systemTroubleDocument={systemTroubleDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const systemTroubleDocument = await fetchSystemTroubleByUid({
    ctx,
  });

  return {
    props: {
      systemTroubleDocument,
    },
  };
};

export default Page;
