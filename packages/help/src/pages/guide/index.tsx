import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import GuideTop from '@/domain/GuideTop';
import {
  fetchGuideByCategoryId,
  fetchGuideTop,
} from '@/localShared/lib/prismic';
import {
  GuideCategoryDocument,
  GuideTopDocument,
} from '@/localShared/lib/prismic/interfaces/guide';

interface Props {
  guideTopDocument: GuideTopDocument;
  guideCategoryDocument: GuideCategoryDocument[];
}

const Page: NextPage<Props> = ({ guideTopDocument, guideCategoryDocument }) => {
  return (
    <React.Fragment>
      <GuideTop
        guideTopDocument={guideTopDocument}
        guideCategoryDocument={guideCategoryDocument}
      />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const guideTopDocument = (await fetchGuideTop()) as GuideTopDocument;

  if (!guideTopDocument) {
    return {
      notFound: true,
    };
  }

  const guideCategoryDocument = await Promise.all(
    guideTopDocument.data.category_links.map((doc) => {
      return fetchGuideByCategoryId({
        uid: doc.category_link.uid as string,
      });
    })
  );

  return {
    props: {
      guideTopDocument,
      guideCategoryDocument,
    },
  };
};

export default Page;
