import React from 'react';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import SearchBox from './SearchBox';
import SortBox from './SortBox';

type Props = {
  updateSearchQuery: UsePurchasedList['updateSearchQuery'];
  updateDisplayOrder: UsePurchasedList['updateDisplayOrder'];
};

const ListController: React.FC<Props> = ({
  updateSearchQuery,
  updateDisplayOrder,
}) => (
  <Container>
    <React.Fragment>
      <div>
        <SearchBox updateSearchQuery={updateSearchQuery} />
      </div>
      <div>
        <SortBox updateDisplayOrder={updateDisplayOrder} />
      </div>
    </React.Fragment>
  </Container>
);

const Container = styled.div`
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: 1fr 2.5rem;
  grid-gap: 0.5rem;
  height: 2.5rem;
`;

export default ListController;
