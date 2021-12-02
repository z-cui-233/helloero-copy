import React from 'react';
import styled from 'styled-components';
import SortIcon from 'src/shared/assets/icon/sort.svg';
import ViewListIcon from 'src/shared/assets/icon/view_list.svg';
import ViewModuleIcon from 'src/shared/assets/icon/view_module.svg';
import device from 'src/shared/styles/device';
import {
  DisplayOrder,
  DISPLAY_ORDER,
  UsePurchasedList,
} from '../../usePurchasedList';

const OptionBox: React.FC<UsePurchasedList> = ({
  state,
  toggleListStyle,
  updateDisplayOrder,
}) => {
  return (
    <Container>
      <SelectContainer>
        <SortIcon />
        <SortList
          defaultValue={DISPLAY_ORDER.NAME_DESC}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            updateDisplayOrder(e.target.value as DisplayOrder);
          }}
        >
          <option value={DISPLAY_ORDER.ADD} key={DISPLAY_ORDER.ADD}>
            追加順
          </option>
          <option value={DISPLAY_ORDER.NAME_ASC} key={DISPLAY_ORDER.NAME_ASC}>
            50音順（あ→わ）順
          </option>
          <option value={DISPLAY_ORDER.NAME_DESC} key={DISPLAY_ORDER.NAME_DESC}>
            50音順（わ→あ）順
          </option>
        </SortList>
      </SelectContainer>
      <ListSwitchButton onClick={toggleListStyle} tabIndex={0}>
        {state.isCardStyle ? <ViewModuleIcon /> : <ViewListIcon />}
      </ListSwitchButton>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5rem;
  grid-gap: 0.5rem;

  @media ${device.mobile} {
    display: flex;
    justify-content: flex-end;
  }
`;

const SelectContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.keyColor.color4};
  border-radius: 0.25rem;
  position: relative;
  opacity: 0.75;
  height: 2.5rem;
  overflow: hidden;

  @media ${device.mobile} {
    width: 2.5rem;
  }

  & svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    left: 0.5rem;
    bottom: 0;
    margin: auto;

    @media ${device.mobile} {
      left: 0;
      right: 0;
    }
  }
`;

const SortList = styled.select`
  appearance: none;
  box-shadow: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.keyColor.color4};
  height: 2rem;
  height: 100%;
  padding: 0 0 0 2.5rem;
  width: 100%;
  font-weight: bold;
  outline: none;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  & option {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media ${device.mobile} {
    opacity: 0;
    padding: 0;
    width: 100%;
  }
`;

const ListSwitchButton = styled.div`
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
