import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import GuideDetail from '@/domain/GuideDetail';
import { fetchGuideByUid } from '@/localShared/lib/prismic';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces/guide';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

type Props = {
  guideDocument: GuideDocument;
};

const Page: NextPage<Props> = ({ guideDocument }) => {
  const { lang } = useLocale();
  const seoTitle = prismicH.asText(guideDocument.data.page_title);
  const title = prismicH.asText(guideDocument.data.question);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={`${seoTitle ? seoTitle : title}${
          lang.help.meta.guideDetail.title
        }`}
        description={lang.help.meta.guideDetail.description}
        isMultiLang={false}
      />
      <GuideDetail guideDocument={guideDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const uid = ctx.query.uid as string;

  const guideDocument = await fetchGuideByUid({ uid });

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
