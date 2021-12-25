import React from 'react';
import styled from 'styled-components';
import ListController from './ListController';
import TitleDetail from './TitleDetail';
import TitleList from './TitleList';
import usePurchasedList from './usePurchasedList';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';

const PurchasedList: React.FC = () => {
  const { lang } = useLocale();
  const store = usePurchasedList();

  return (
    <Container>
      <Title>{lang.helloero.myLibrary.purchased.title}</Title>
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
