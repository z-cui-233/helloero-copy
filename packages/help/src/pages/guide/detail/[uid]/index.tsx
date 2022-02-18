import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import GuideDetail from '@/domain/GuideDetail';
import { fetchGuideByUid } from '@/localShared/lib/prismic';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  guideDocument: GuideDocument;
};

const Page: NextPage<Props> = ({ guideDocument }) => {
  const seoTitle = prismicH.asText(guideDocument.data.page_title);
  const title = prismicH.asText(guideDocument.data.question);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={`${
          seoTitle ? seoTitle : title
        } - よくある質問 - H2U ヘルプセンター`}
      />
      <GuideDetail guideDocument={guideDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guideDocument = await fetchGuideByUid({
    ctx,
    uid: ctx.query.uid as string,
  });

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
