import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import InfoDetail from '@/domain/InfoDetail';
import { fetchInfoByUid } from '@/localShared/lib/prismic';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces/info';

interface Props {
  infoDocument: InfoDocument;
}

const Page: NextPage<Props> = ({ infoDocument }) => {
  return (
    <React.Fragment>
      <InfoDetail infoDocument={infoDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const infoDocument = await fetchInfoByUid({ uid: ctx.query.uid as string });

  if (!infoDocument) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      infoDocument,
    },
  };
};

export default Page;
