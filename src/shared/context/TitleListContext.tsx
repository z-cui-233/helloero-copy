import React, { useContext, useState } from 'react';

export const DISPLAY_ORDER = {
  ADD: 'add',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;

export type displayOrder = typeof DISPLAY_ORDER[keyof typeof DISPLAY_ORDER];

interface ContextProps {
  query: string;
  displayOrder: displayOrder;
  isCardStyle: boolean;
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: displayOrder) => void;
  toggleListStyle: () => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TitleListContext: React.Context<ContextProps> = React.createContext(null);

const TitleListProvider: React.FC = (props) => {
  const [query, setQuery] = useState<string>('');
  const [displayOrder, setDisplayOrder] = useState<displayOrder>(
    DISPLAY_ORDER.ADD
  );
  const [isCardStyle, setIsCardStyle] = useState<boolean>(false);

  const updateSearchQuery = (newValue: string): void => {
    setQuery(newValue);
  };

  const updateDisplayOrder = (newValue: displayOrder): void => {
    setDisplayOrder(newValue);
  };

  const toggleListStyle = (): void => {
    setIsCardStyle(!isCardStyle);
  };

  return (
    <TitleListContext.Provider
      value={{
        query,
        displayOrder,
        isCardStyle,
        updateSearchQuery,
        updateDisplayOrder,
        toggleListStyle,
      }}
    >
      {props.children}
    </TitleListContext.Provider>
  );
};

const useTitleListContext = () => {
  const {
    query,
    displayOrder,
    isCardStyle,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
  } = useContext(TitleListContext);

  return {
    query,
    displayOrder,
    isCardStyle,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
  };
};

export { TitleListProvider, useTitleListContext };
