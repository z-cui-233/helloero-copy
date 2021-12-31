import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces/guide';
import BigBar from '@/shared/components/BigBar';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import typo from '@/shared/styles/typo';

interface Props {
  guideDocument: GuideDocument;
}

const GuideDetail: React.FC<Props> = ({ guideDocument }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title="よくある質問" />
      <MainContainer size="large">
        <article>
          <Title>
            <PrismicText field={guideDocument.data.question} />
          </Title>
          <RichTextContainer>
            <PrismicRichText field={guideDocument.data.answer} />
          </RichTextContainer>
        </article>
      </MainContainer>
    </LayoutH2u>
  );
};

const Title = styled.h1`
  ${typo.Heading2};
  margin: 0.5rem 0 2rem;
`;

export default GuideDetail;
