import { GetServerSideProps, NextPage } from 'next';
import * as prismicT from '@prismicio/types';
import React from 'react';
import InfoList from '@/domain/InfoList';
import { fetchInfoList } from '@/localShared/lib/prismic';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces/info';

interface Props {
  infoDocuments: prismicT.Query<InfoDocument>;
}

const Page: NextPage<Props> = ({ infoDocuments }) => {
  return (
    <React.Fragment>
      <InfoList infoDocuments={infoDocuments} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const infoDocuments = await fetchInfoList({ pageSize: 100, page: 1 });

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
