import React from 'react';
import typo from '../../../shared/styles/typo';
import styled from 'styled-components';
import ListController from './ListController';
import TitleDetail from './TitleDetail';
import TitleList from './TitleList';
import usePurchasedList from './usePurchasedList';

const PurchasedList: React.FC = () => {
  const store = usePurchasedList();

  return (
    <Container>
      <Title>登録済みの動画</Title>
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
    </Container>
  );
};

const Container = styled.div`
  margin: 4rem 0 0;
`;

const Title = styled.div`
  ${typo.Heading1};
  line-height: 1.4;
`;

export default PurchasedList;
