import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { globalConfig } from 'src/globalConfig';
import MenuCard from './MenuCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import typo from '@/shared/styles/typo';

const MenuList = [
  {
    key: 'guide',
    title: 'よくある質問',
    text: 'H2U、HELLOEROについて、使い方やご質問、ご不明な点を確認できます。',
  },
  {
    key: 'info',
    title: 'お知らせ',
    text: 'H2Uからのお知らせを確認できます。',
  },
  {
    key: 'inquiry',
    title: 'お問い合わせ',
    text: '「よくある質問」で解決しない問題についてお問い合わせください。',
  },
] as const;

const HelpTop: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title="ヘルプセンター" />
      <MainContainer>
        {MenuList.map((data) => {
          <MenuCard
            urlPattern={data.key}
            title={data.title}
            texts={data.text}
          />;
        })}
        <TermsLink>
          <Link href="/terms/service" passHref>
            <a>利用規約</a>
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
