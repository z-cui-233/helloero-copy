import * as prismicT from '@prismicio/types';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InfoList from '@/domain/InfoList';
import { fetchInfoList } from '@/localShared/lib/prismic';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  infoDocuments: prismicT.Query<InfoDocument>;
};

const Page: NextPage<Props> = ({ infoDocuments }) => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="お知らせ - H2U ヘルプセンター"
      />
      <InfoList infoDocuments={infoDocuments} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const infoDocuments = await fetchInfoList({ ctx, pageSize: 100, page: 1 });

  if (!infoDocuments) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      infoDocuments,
    },
  };
};

export default Page;
