import React, {
  createContext,
  useReducer,
  PropsWithChildren,
  useContext,
} from 'react';
import { Context, State, Action } from '@shapes/store';

const initialStoreContext: Context = {
  state: {
    width: undefined,
    height: undefined,
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

const GlobalStateProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(reducer, initialStoreContext.state);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useGlobalStore = () => useContext(GlobalStoreContext);

export { GlobalStoreContext, GlobalStateProvider, useGlobalStore };
