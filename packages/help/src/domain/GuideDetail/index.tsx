import React from 'react';
import styled from 'styled-components';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { GuideDocument } from '@/localShared/lib/prismic/interfaces';
import BigBar from '@/shared/components/BigBar';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import typo from '@/shared/styles/typo';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';
import { useLocale } from '@/shared/context/LocaleContext';

type Props = {
  guideDocument: GuideDocument;
};

const GuideDetail: React.FC<Props> = ({ guideDocument }) => {
  const { locale, lang } = useLocale();
  const title = prismicH.asText(guideDocument.data.question);

  const breadcrumbs: Breadcrumbs[] = [
    {
      path: `/${locale}`,
      text: lang.help.top.title,
    },
    {
      path: `/${locale}/guide`,
      text: lang.help.guide.title,
    },
    {
      path: `/${locale}/guide/detail/${guideDocument.uid}`,
      text: title as string,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.help.guide.title} />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Container>
          <Title>
            <PrismicText field={guideDocument.data.question} />
          </Title>
          <RichTextContainer>
            <PrismicRichText field={guideDocument.data.answer} />
          </RichTextContainer>
        </Container>
      </MainContainer>
    </LayoutH2u>
  );
};

const Container = styled.article`
  margin: 1.5rem 0 0;
`;

const Title = styled.h1`
  ${typo.Heading2};
  margin: 0 0 2rem;
`;

export default GuideDetail;
