import React from 'react';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import OptionBox from './OptionBox';
import SearchBox from './SearchBox';

const ListController: React.FC<UsePurchasedList> = (props) => {
  return (
    <Container>
      <SearchContainer>
        <SearchBox {...props} />
      </SearchContainer>
      <OptionContainer>
        <OptionBox {...props} />
      </OptionContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 1.5rem 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

const SearchContainer = styled.div`
  grid-column: 1 / 4;
`;

const OptionContainer = styled.div`
  grid-column: 4 / 5;
`;

export default ListController;
