import { useState } from 'react';

export const DISPLAY_ORDER = {
  ADD: 'add',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;
export type DisplayOrder = typeof DISPLAY_ORDER[keyof typeof DISPLAY_ORDER];

export interface UsePurchasedList {
  state: {
    query: string;
    displayOrder: DisplayOrder;
    isCardStyle: boolean;
  };
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  toggleListStyle: () => void;
}

const usePurchasedList = (): UsePurchasedList => {
  const [state, setState] = useState<UsePurchasedList['state']>({
    query: '',
    displayOrder: DISPLAY_ORDER.ADD,
    isCardStyle: false,
  });

  const updateSearchQuery = (newValue: string): void => {
    setState((state) => ({
      ...state,
      query: newValue,
    }));
  };

  const updateDisplayOrder = (newValue: DisplayOrder): void => {
    setState((state) => ({
      ...state,
      displayOrder: newValue,
    }));
  };

  const toggleListStyle = (): void => {
    setState((state) => ({
      ...state,
      isCardStyle: !state.isCardStyle,
    }));
  };

  return {
    state,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
  };
};

export default usePurchasedList;
