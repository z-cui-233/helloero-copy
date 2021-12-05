import React from 'react';
import styled from 'styled-components';
import ViewListIcon from 'src/shared/assets/icon/view_list.svg';
import ViewModuleIcon from 'src/shared/assets/icon/view_module.svg';
import { UsePurchasedList } from '../../usePurchasedList';

const OptionBox: React.FC<UsePurchasedList> = ({ state, toggleListStyle }) => {
  return (
    <Container onClick={toggleListStyle} tabIndex={0}>
      {state.isCardStyle ? <ViewModuleIcon /> : <ViewListIcon />}
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  border: 2px solid ${({ theme }) => theme.keyColor.color4};
  border-radius: 0.25rem;
  opacity: 0.75;
  position: relative;
  outline: none;

  & svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

export default OptionBox;
