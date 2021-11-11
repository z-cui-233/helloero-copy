import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import ListController from './ListController';
import TitleList from './TitleList';

const PurchasedList: React.FC = () => {
  return (
    <Container>
      <Title>登録済みの動画</Title>
      <ListController />
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
