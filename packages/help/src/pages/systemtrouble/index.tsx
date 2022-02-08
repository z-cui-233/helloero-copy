import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import SystemTrouble from '@/domain/SystemTrouble';
import { useLocale } from '@/shared/context/LocaleContext';
import MetaTags from '@/shared/components/MetaTags';
import { fetchSystemTroubleByUid } from '@/localShared/lib/prismic';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const Page: NextPage<Props> = ({ systemTroubleDocument }) => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.systemTrouble.title}
        description={lang.help.meta.systemTrouble.description}
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
