import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import usePurchasedList from './usePurchasedList';
import ListController from './ListController';
import TitleDetail from './TitleDetail';
import TitleList from './TitleList';
import WabikenMenu from './WabikenMenu';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import typo from '@/shared/styles/typo';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import MainContainer from '@/shared/components/MainContainer';

const MyLibrary: React.FC = () => {
  const {
    purchasedListState,
    updateSearchQuery,
    updateDisplayOrder,
    openTitleDetail,
    closeTitleDetail,
    fetchUserWabikenMetas,
  } = usePurchasedList();

  return (
    <LayoutHelloero options={globalConfig}>
      <MainContainer size="large">
        <WabikenMenu />
        <Title>購入済み作品</Title>
        <ListController
          updateSearchQuery={updateSearchQuery}
          updateDisplayOrder={updateDisplayOrder}
        />
        <TitleList
          purchasedListState={purchasedListState}
          openTitleDetail={openTitleDetail}
          fetchUserWabikenMetas={fetchUserWabikenMetas}
        />
        <TitleDetail
          userWabikenMeta={purchasedListState.currentUserWabikenMeta}
          isShownDetail={purchasedListState.isShownDetail}
          onClickClose={closeTitleDetail}
        />
      </MainContainer>
    </LayoutHelloero>
  );
};

const Title = styled.div`
  ${typo.Heading1};
  line-height: 1.4;
  margin: 3rem 0 0;
`;

export default withAmplifyAuth(MyLibrary, globalConfig);
