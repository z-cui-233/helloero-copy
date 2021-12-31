import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import GuideDetail from '@/domain/GuideDetail';
import { fetchGuideByUid } from '@/localShared/lib/prismic';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces/guide';

interface Props {
  guideDocument: GuideDocument;
}

const Page: NextPage<Props> = ({ guideDocument }) => {
  return (
    <React.Fragment>
      <GuideDetail guideDocument={guideDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guideDocument = await fetchGuideByUid({ uid: ctx.query.uid as string });

  if (!guideDocument) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guideDocument,
    },
  };
};

export default Page;
