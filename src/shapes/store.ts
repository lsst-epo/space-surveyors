import { Dispatch } from 'react';

type Context = { state: State; dispatch: Dispatch<Action> };

interface State {
  width: number | null | undefined;
  height: number | null | undefined;
}

interface Entry {
  name: string;
}

// Discriminating Union
type Action = SetSizeAction;

interface SetSizeAction {
  type: 'SET_CONTAINER_SIZE';
  width: number | undefined;
  height: number | undefined;
}

export { Context, State, Entry, Action };
