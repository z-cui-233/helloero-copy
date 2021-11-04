import React, { useContext, useReducer } from 'react';

export const FLOW_STATUS = {
  SHRINK: 'shrink',
  EXPAND: 'expand',
  EXPAND_LOADED: 'EXPAND_LOADED',
} as const;

export const ACTION_TYPE = {
  REQUEST_OPEN: 'REQUEST_OPEN',
  LOADED: 'LOADED',
  CLOSE: 'CLOSE',
} as const;

interface Store {
  flowStatus: typeof FLOW_STATUS[keyof typeof FLOW_STATUS];
  wabiken: string;
}

interface Action {
  type: typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
  payload: Store;
}

const initialState: Store = {
  flowStatus: FLOW_STATUS.SHRINK,
  wabiken: '',
};

interface ContextProps {
  state: Store;
  dispatch: React.Dispatch<Action>;
}

const reducer: React.Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.REQUEST_OPEN: {
      return {
        ...state,
        ...action.payload,
        flowStatus: FLOW_STATUS.EXPAND,
      };
    }

    case ACTION_TYPE.LOADED: {
      return {
        ...state,
        ...action.payload,
        flowStatus: FLOW_STATUS.EXPAND_LOADED,
      };
    }

    case ACTION_TYPE.CLOSE: {
      return {
        ...state,
        ...action.payload,
        flowStatus: FLOW_STATUS.SHRINK,
      };
    }

    default: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TitleDetailCardContext: React.Context<ContextProps> = React.createContext(
  {
    isDisplayed: false as boolean,
    wabiken: '',
  }
);

const TitleDetailCardProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TitleDetailCardContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </TitleDetailCardContext.Provider>
  );
};

const useTitleDetailCardContext = (): ContextProps => {
  const { state, dispatch } = useContext(TitleDetailCardContext);

  if (state === null) {
    throw new Error('can not find TitleDetailCardProvider');
  }

  return {
    state,
    dispatch,
  };
};

export { TitleDetailCardProvider, useTitleDetailCardContext };
