import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '@/shared/assets/icon/search.svg';
import useDebounce from '@/shared/hooks/useDebounce';
import typo from '@/shared/styles/typo';
import { UsePurchasedList } from '../../usePurchasedList';

type Props = {
  updateSearchQuery: UsePurchasedList['updateSearchQuery'];
};

const SearchBox: React.FC<Props> = ({ updateSearchQuery }) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 600);

  useEffect(() => {
    updateSearchQuery(debouncedQuery);
  }, [debouncedQuery, updateSearchQuery]);

  return (
    <Container>
      <StyledIcon />
      <Input
        type="text"
        value={query}
        placeholder="タイトル名で検索"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
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
