import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import TermsAccount from '@/domain/TermsAccount';
import { fetchTermsAccount } from '@/localShared/lib/prismic';
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
        title="H2Uアカウント利用規約 - H2U ヘルプセンター"
      />
      <TermsAccount termsDocument={termsDocument} />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const termsDocument = (await fetchTermsAccount({
    ctx,
  })) as TermsDocument;

  return {
    props: {
      termsDocument,
    },
  };
};

export default Page;
