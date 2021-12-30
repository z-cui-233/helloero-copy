import { GetServerSideProps, NextPage } from 'next';
import * as prismicT from '@prismicio/types';
import React from 'react';
import InfoList from '@/domain/InfoList';
import { fetchInfoList } from '@/localShared/lib/prismic';

interface Props {
  prismicData: prismicT.Query<prismicT.PrismicDocument>;
}

const Page: NextPage<Props> = ({ prismicData }) => {
  return (
    <React.Fragment>
      <InfoList prismicData={prismicData} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prismicData = await fetchInfoList({ pageSize: 100, page: 1 });

  return {
    props: {
      prismicData,
    },
  };
};

export default Page;
