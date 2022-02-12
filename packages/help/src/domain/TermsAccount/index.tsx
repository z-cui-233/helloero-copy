import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { PrismicRichText } from '@prismicio/react';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { TermsDocument } from '@/localShared/lib/prismic/interfaces';
import RichTextContainer from '@/localShared/components/RichTextContainer';

type Props = {
  termsDocument: TermsDocument;
};

const TermsAccount: React.FC<Props> = ({ termsDocument }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <RichTextContainer>
          <PrismicRichText field={termsDocument.data.text} />
        </RichTextContainer>
      </MainContainer>
    </LayoutH2u>
  );
};

export default TermsAccount;
