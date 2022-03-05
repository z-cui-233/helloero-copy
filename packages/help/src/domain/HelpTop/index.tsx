import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import ArrowTextLink from '@/shared/components/ArrowTextLink';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';
import SystemTrouble from './SystemTrouble';
import MenuCard from './MenuCard';

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

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const HelpTop: React.FC<Props> = ({ systemTroubleDocument }) => {
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <PageTitle text="ヘルプセンター" />
        <SystemTrouble systemTroubleDocument={systemTroubleDocument} />
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
          <ArrowTextLink href="/terms" text="利用規約" />
        </TermsLink>
      </MainContainer>
    </LayoutH2u>
  );
};

const Menus = styled.section`
  margin: 3rem 0 0;
`;

const TermsLink = styled.div`
  margin: 2rem 0 0;
  padding: 0 1rem 0 0;
  text-align: right;
`;

export default HelpTop;
