import React from 'react';
import styled from 'styled-components';
import { UsePurchasedList } from '../../usePurchasedList';
import typo from '@/shared/styles/typo';
import Icon from '@/shared/assets/icon/search.svg';
import { useLocale } from '@/shared/context/LocaleContext';

const SearchBox: React.FC<UsePurchasedList> = ({
  purchasedListState,
  updateSearchQuery,
}) => {
  const { lang } = useLocale();

  return (
    <Container>
      <StyledIcon />
      <Input
        type="text"
        value={purchasedListState.query}
        placeholder={lang.helloero.myLibrary.filter.search}
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
  border-radius: 0.2rem;
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
