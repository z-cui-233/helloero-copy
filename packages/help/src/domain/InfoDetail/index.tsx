import React from 'react';
import { PrismicText, PrismicRichText } from '@prismicio/react';
import styled from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import { globalConfig } from 'src/globalConfig';
import MainContainer from '@/shared/components/parts/MainContainer';
import LayoutH2u from '@/shared/components/LayoutH2u';
import typo from '@/shared/styles/typo';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { convertDateToString } from '@/shared/utils';
import { useLocale } from '@/shared/context/LocaleContext';
import BigBar from '@/shared/components/BigBar';
import { InfoDocument } from '@/localShared/lib/prismic/interfaces';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';

type Props = {
  infoDocument: InfoDocument;
};

const InfoDetail: React.FC<Props> = ({ infoDocument }) => {
  const { locale, lang } = useLocale();
  const date = prismicH.asDate(infoDocument.data.publish_date);
  const title = prismicH.asText(infoDocument.data.title);

  const breadcrumbs: Breadcrumbs[] = [
    {
      path: `/${locale}`,
      text: lang.help.top.title,
    },
    {
      path: `/${locale}/info`,
      text: lang.help.info.title,
    },
    {
      path: `/${locale}/info/${infoDocument.uid}`,
      text: title as string,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.help.info.title} />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <Container>
          <ReleaseDate>{convertDateToString(locale, date)}</ReleaseDate>
          <Title>
            <PrismicText field={infoDocument.data.title} />
          </Title>
          <RichTextContainer>
            <PrismicRichText field={infoDocument.data.text} />
          </RichTextContainer>
        </Container>
      </MainContainer>
    </LayoutH2u>
  );
};

const Container = styled.article`
  margin: 1.5rem 0 0;
`;

const ReleaseDate = styled.div`
  ${typo.Body};
  font-weight: bold;
  color: ${({ theme }) => theme.foreground.secondary};
`;

const Title = styled.h1`
  ${typo.Heading2};
  margin: 0 0 2rem;
`;

export default InfoDetail;
