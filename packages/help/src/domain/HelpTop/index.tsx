import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { globalConfig } from 'src/globalConfig';
import MenuCard from './MenuCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import { useLocale } from '@/shared/context/LocaleContext';
import typo from '@/shared/styles/typo';

const HelpTop: React.FC = () => {
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.help.top.title} />
      <MainContainer>
        <MenuCard
          urlPattern={'guide'}
          title={lang.help.top.guide.title}
          texts={lang.help.top.guide.text}
        />
        <MenuCard
          urlPattern={'info'}
          title={lang.help.top.info.title}
          texts={lang.help.top.info.text}
        />
        <MenuCard
          urlPattern={'inquiry'}
          title={lang.help.top.inquiry.title}
          texts={lang.help.top.inquiry.text}
        />
        <TermsLink>
          <Link href="/terms/service" passHref>
            <a>{lang.help.top.terms}</a>
          </Link>
        </TermsLink>
      </MainContainer>
    </LayoutH2u>
  );
};

const TermsLink = styled.div`
  margin: 3rem 0 0;
  text-align: center;

  & > a {
    ${typo.Standard};
  }
`;

export default HelpTop;
