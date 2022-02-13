import React from 'react';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import SearchBox from './SearchBox';
import SortBox from './SortBox';

const ListController: React.FC<UsePurchasedList> = (props) => {
  return (
    <Container>
      <React.Fragment>
        <div>
          <SearchBox {...props} />
        </div>
        <div>
          <SortBox {...props} />
        </div>
      </React.Fragment>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: 1fr 2.5rem;
  grid-gap: 0.5rem;
  height: 2.5rem;
`;

export default ListController;
