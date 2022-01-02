import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import GuideBrowse from '@/domain/GuideBrowse';
import { fetchGuideByCategoryId } from '@/localShared/lib/prismic';
import { GuideCategoryDocument } from '@/localShared/lib/prismic/interfaces/guide';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

type Props = {
  guideCategoryDocument: GuideCategoryDocument;
};

const Page: NextPage<Props> = ({ guideCategoryDocument }) => {
  const { lang } = useLocale();
  const title = prismicH.asText(guideCategoryDocument.data.title);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={`${title}${lang.help.meta.guideCategory.title}`}
        description={lang.help.meta.guideCategory.description}
        isMultiLang={false}
      />
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
