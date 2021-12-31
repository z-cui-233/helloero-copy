import { GetServerSideProps, NextPage } from 'next';
import * as prismicT from '@prismicio/types';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InfoList from '@/domain/InfoList';
import { fetchInfoList } from '@/localShared/lib/prismic';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces/info';
import MetaTags from '@/shared/components/MetaTags';
import { useLocale } from '@/shared/context/LocaleContext';

interface Props {
  infoDocuments: prismicT.Query<InfoDocument>;
}

const Page: NextPage<Props> = ({ infoDocuments }) => {
  const { lang } = useLocale();

  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title={lang.help.meta.info.title}
        description={lang.help.meta.info.description}
        isMultiLang={false}
      />
      <InfoList infoDocuments={infoDocuments} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const infoDocuments = await fetchInfoList({ pageSize: 100, page: 1 });

  if (!infoDocuments) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      infoDocuments,
    },
  };
};

export default Page;
