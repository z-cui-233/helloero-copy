import React from 'react';
import styled from 'styled-components';
import typo from 'src/shared/styles/typo';
import Icon from 'src/shared/assets/icon/search.svg';
import { UsePurchasedList } from '../../usePurchasedList';

const SearchBox: React.FC<UsePurchasedList> = ({
  state,
  updateSearchQuery,
}) => {
  return (
    <Container>
      <StyledIcon />
      <Input
        type="text"
        value={state.query}
        placeholder="タイトル名で検索"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateSearchQuery(e.target.value);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledIcon = styled(Icon)`
  &&& {
    position: absolute;
    top: 0rem;
    left: 0.75rem;
    bottom: 0rem;
    margin: auto;
    height: 1.5rem;
    width: 1.5rem;
    display: block;

    path {
      fill: ${({ theme }) => theme.background.quinary};
    }
  }
`;

const Input = styled.input`
  ${typo.Standard};
  border-radius: 0.25rem;
  appearance: none;
  background-color: ${({ theme }) => theme.background.secondary};
  border: none;
  box-shadow: none;
  color: ${({ theme }) => theme.foreground.primary};
  padding: 0 0.5rem 0 3rem;
  height: 2.5rem;
  width: 100%;
`;

export default SearchBox;
