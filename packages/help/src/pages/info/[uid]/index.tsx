import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicT from '@prismicio/types';
import InfoDetail from '@/domain/InfoDetail';
import { fetchInfoByUid } from '@/localShared/lib/prismic';

interface Props {
  prismicData: prismicT.PrismicDocument;
}

const Page: NextPage<Props> = ({ prismicData }) => {
  return (
    <React.Fragment>
      <InfoDetail prismicData={prismicData} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prismicData = await fetchInfoByUid({ uid: ctx.query.uid as string });

  if (!prismicData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      prismicData,
    },
  };
};

export default Page;
