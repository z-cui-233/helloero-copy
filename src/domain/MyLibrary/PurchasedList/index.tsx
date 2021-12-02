import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import ListController from './ListController';
import TitleList from './TitleList';
import usePurchasedList from './usePurchasedList';

const PurchasedList: React.FC = () => {
  const store = usePurchasedList();

  return (
    <Container>
      <Title>登録済みの動画</Title>
      <ListController {...store} />
      <TitleList />
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
