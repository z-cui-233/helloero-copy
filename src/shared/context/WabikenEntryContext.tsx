import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';

export const FLOW_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

export const ACTION_TYPE = {
  LOADED: 'LOADED',
  INPUTTED: 'INPUTTED',
  CONFIRMED: 'CONFIRMED',
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
  flowStatus: FLOW_STATUS.INIT,
  wabiken: '',
};

interface ContextProps {
  state: Store;
  dispatch: React.Dispatch<Action>;
}

const reducer: React.Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOADED: {
      return {
        ...state,
        ...action.payload,
        flowStatus:
          action.payload.wabiken !== ''
            ? FLOW_STATUS.CONFIRM
            : FLOW_STATUS.INPUT,
      };
    }

    case ACTION_TYPE.INPUTTED: {
      return {
        ...state,
        ...action.payload,
        flowStatus: FLOW_STATUS.CONFIRM,
      };
    }

    case ACTION_TYPE.CONFIRMED: {
      return {
        ...state,
        ...action.payload,
        flowStatus: FLOW_STATUS.COMPLETE,
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
const WabikenEntryContext: React.Context<ContextProps> = React.createContext({
  state: initialState,
});

const WabikenEntryProvider: React.FC = (props) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.LOADED,
      payload: {
        ...initialState,
        wabiken: router.query.wabiken ? (router.query.wabiken as string) : '',
      },
    });
  }, [router.query.wabiken]);

  return (
    <WabikenEntryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WabikenEntryContext.Provider>
  );
};

const useWabikenEntryContext = (): ContextProps => {
  const { state, dispatch } = useContext(WabikenEntryContext);

  if (state === null) {
    throw new Error('can not find WabikenEntryProvider');
  }

  return { state, dispatch };
};

export { WabikenEntryProvider, useWabikenEntryContext };
