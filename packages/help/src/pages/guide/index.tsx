import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import GuideTop from '@/domain/GuideTop';
import {
  fetchGuideByCategoryId,
  fetchGuideTop,
} from '@/localShared/lib/prismic';
import {
  GuideCategoryDocument,
  GuideTopDocument,
} from '@/localShared/lib/prismic/interfaces';
import { useLocale } from '@/shared/context/LocaleContext';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  guideTopDocument: GuideTopDocument;
  guideCategoryDocument: GuideCategoryDocument[];
};

const Page: NextPage<Props> = ({ guideTopDocument, guideCategoryDocument }) => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.guide.title}
        description={lang.help.meta.guide.description}
      />
      <GuideTop
        guideTopDocument={guideTopDocument}
        guideCategoryDocument={guideCategoryDocument}
      />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guideTopDocument = (await fetchGuideTop({ ctx })) as GuideTopDocument;

  if (!guideTopDocument) {
    return {
      notFound: true,
    };
  }

  const guideCategoryDocument = await Promise.all(
    guideTopDocument.data.category_links.map((doc) => {
      return fetchGuideByCategoryId({
        ctx,
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
