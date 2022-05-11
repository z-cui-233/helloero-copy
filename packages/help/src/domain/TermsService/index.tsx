import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { TermsDocument } from '@/localShared/lib/prismic/interfaces';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';

type Props = {
  termsDocument: TermsDocument;
};

const TermsService: React.FC<Props> = ({ termsDocument }) => {
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

export default TermsService;
