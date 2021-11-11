import React from 'react';
import styled from 'styled-components';
import OptionBox from './OptionBox';
import SearchBox from './SearchBox';

const ListController: React.FC = () => {
  return (
    <Container>
      <SearchContainer>
        <SearchBox />
      </SearchContainer>
      <OptionContainer>
        <OptionBox />
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
