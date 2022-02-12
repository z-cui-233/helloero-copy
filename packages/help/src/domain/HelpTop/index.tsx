import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { globalConfig } from 'src/globalConfig';
import MenuCard from './MenuCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import typo from '@/shared/styles/typo';
import PageTitle from '@/shared/components/PageTitle';

const MenuList = [
  {
    key: 'guide',
    title: 'よくある質問',
    text: '使い方やご質問、ご不明な点を確認できます。',
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
      <MainContainer>
        <PageTitle text="ヘルプセンター" />
        <Menus>
          {MenuList.map((data) => (
            <MenuCard
              key={data.key}
              urlPattern={data.key}
              title={data.title}
              texts={data.text}
            />
          ))}
        </Menus>
        <TermsLink>
          <Link href="/terms" passHref>
            <a>利用規約</a>
          </Link>
        </TermsLink>
      </MainContainer>
    </LayoutH2u>
  );
};

const Menus = styled.section`
  margin: 2rem 0 0;
`;

const TermsLink = styled.div`
  margin: 2rem 0 0;
  text-align: center;

  & > a {
    ${typo.Standard};
  }
`;

export default HelpTop;
