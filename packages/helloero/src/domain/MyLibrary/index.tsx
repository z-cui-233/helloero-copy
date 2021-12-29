import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import usePurchasedList from './usePurchasedList';
import ListController from './ListController';
import TitleDetail from './TitleDetail';
import TitleList from './TitleList';
import WabikenMenu from './WabikenMenu';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import { useLocale } from '@/shared/context/LocaleContext';
import typo from '@/shared/styles/typo';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import MainContainer from '@/shared/components/parts/MainContainer';

const MyLibrary: React.FC = () => {
  const { lang } = useLocale();
  const store = usePurchasedList();

  return (
    <LayoutHelloero options={globalConfig}>
      <MainContainer size="large">
        <Title>{lang.helloero.myLibrary.purchased.title}</Title>
        <WabikenMenu />
        <ListController {...store} />
        <TitleList
          purchasedListState={store.purchasedListState}
          openTitleDetail={store.openTitleDetail}
          fetchListData={store.fetchListData}
        />
        <TitleDetail
          userWabikenMeta={store.purchasedListState.currentUserWabikenMeta}
          isShownDetail={store.purchasedListState.isShownDetail}
          onClickClose={store.closeTitleDetail}
        />
      </MainContainer>
    </LayoutHelloero>
  );
};

const Title = styled.div`
  ${typo.Heading1};
  line-height: 1.4;
`;

export default withAmplifyAuth(MyLibrary, globalConfig);
