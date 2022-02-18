import React from 'react';
import styled from 'styled-components';
import {
  DisplayOrder,
  DISPLAY_ORDER,
  UsePurchasedList,
} from '../../usePurchasedList';
import SortIcon from '@/shared/assets/icon/sort.svg';
import device from '@/shared/styles/device';

const OPTIONS = [
  {
    key: DISPLAY_ORDER.ADD_DESC,
    text: '購入日の新しい順',
  },
  {
    key: DISPLAY_ORDER.ADD_ASC,
    text: '購入日の古い順',
  },
  {
    key: DISPLAY_ORDER.NAME_ASC,
    text: '50音順（あ→わ）順',
  },
  {
    key: DISPLAY_ORDER.NAME_DESC,
    text: '50音順（わ→あ）順',
  },
] as const;

type Props = {
  updateDisplayOrder: UsePurchasedList['updateDisplayOrder'];
};

const SortBox: React.FC<Props> = ({ updateDisplayOrder }) => (
  <Container>
    <SortIcon />
    <SortList
      defaultValue={DISPLAY_ORDER.ADD_DESC}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        updateDisplayOrder(e.target.value as DisplayOrder);
      }}
    >
      {OPTIONS.map(({ key, text }) => (
        <option value={key} key={key}>
          {text}
        </option>
      ))}
    </SortList>
  </Container>
);

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.keyColor.color4};
  border-radius: 0.2rem;
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
  cursor: pointer;
  height: 2rem;
  height: 100%;
  width: 100%;
  font-weight: bold;
  outline: none;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  opacity: 0;

  & option {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
export default SortBox;
