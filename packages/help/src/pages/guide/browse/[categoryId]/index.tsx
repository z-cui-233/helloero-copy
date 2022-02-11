import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import GuideBrowse from '@/domain/GuideBrowse';
import { fetchGuideByCategoryId } from '@/localShared/lib/prismic';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  guideCategoryDocument: GuideCategoryDocument;
};

const Page: NextPage<Props> = ({ guideCategoryDocument }) => {
  const title = prismicH.asText(guideCategoryDocument.data.title);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={`${title} - よくある質問 - H2U ヘルプセンター`}
      />
      <GuideBrowse guideCategoryDocument={guideCategoryDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guideCategoryDocument = await fetchGuideByCategoryId({
    ctx,
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
