import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import SystemTrouble from '@/domain/SystemTrouble';
import { fetchSystemTroubleByUid } from '@/localShared/lib/prismic';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const Page: NextPage<Props> = ({ systemTroubleDocument }) => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="緊急のお知らせ - H2U ヘルプセンター"
      />
      <SystemTrouble systemTroubleDocument={systemTroubleDocument} />
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
