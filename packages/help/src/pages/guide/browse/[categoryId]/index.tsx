import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import GuideBrowse from '@/domain/GuideBrowse';
import { fetchGuideByCategoryId } from '@/localShared/lib/prismic';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces/guide';

interface Props {
  guideCategoryDocument: GuideCategoryDocument;
}

const Page: NextPage<Props> = ({ guideCategoryDocument }) => {
  return (
    <React.Fragment>
      <GuideBrowse guideCategoryDocument={guideCategoryDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guideCategoryDocument = await fetchGuideByCategoryId({
    uid: ctx.query.categoryId as string,
  });

  if (!guideCategoryDocument) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guideCategoryDocument,
    },
  };
};

export default Page;
