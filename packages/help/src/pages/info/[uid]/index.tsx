import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import InfoDetail from '@/domain/InfoDetail';
import { fetchInfoByUid } from '@/localShared/lib/prismic';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import { useLocale } from '@/shared/context/LocaleContext';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  infoDocument: InfoDocument;
};

const Page: NextPage<Props> = ({ infoDocument }) => {
  const { lang } = useLocale();
  const title = prismicH.asText(infoDocument.data.title);

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={`${title}${lang.help.meta.infoDetail.title}`}
        description={lang.help.meta.infoDetail.description}
        isMultiLang={false}
      />
      <InfoDetail infoDocument={infoDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const infoDocument = await fetchInfoByUid({
    ctx,
    uid: ctx.query.uid as string,
  });

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
