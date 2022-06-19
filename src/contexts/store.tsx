import React, { createContext, useReducer, PropsWithChildren } from 'react';
import { Context, State, Action } from '@shapes/store';

const initialStoreContext: Context = {
  state: {
    width: 1,
    height: 1,
  },
  dispatch: _a => {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CONTAINER_SIZE':
      const { width, height } = action;
      return { ...state, width, height };

    default:
      return state;
  }
};

const GlobalStoreContext = createContext(initialStoreContext);
const { Provider } = GlobalStoreContext;

const StateProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(reducer, initialStoreContext.state);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { GlobalStoreContext, StateProvider };
