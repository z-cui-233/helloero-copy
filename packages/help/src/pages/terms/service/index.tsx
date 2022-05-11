import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import TermsService from '@/domain/TermsService';
import { fetchTermsHelloEroService } from '@/localShared/lib/prismic';
import { TermsDocument } from '@/localShared/lib/prismic/interfaces';
import MetaTags from '@/shared/components/MetaTags';

type Props = {
  termsDocument: TermsDocument;
};

const Page: NextPage<Props> = ({ termsDocument }) => {
  return (
    <React.Fragment>
      <MetaTags
        host={globalConfig.HELP}
        title="HELLO ERO サービス利⽤規約 - H2U ヘルプセンター"
      />
      <TermsService termsDocument={termsDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const termsDocument = (await fetchTermsHelloEroService({
    ctx,
  })) as TermsDocument;

  return {
    props: {
      termsDocument,
    },
  };
};

export default Page;
