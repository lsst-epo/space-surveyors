import { GameEvent } from './event';

interface GameEntities {
  state: any;
  backdrop: any;
}

interface TickArgs {
  input: any;
  window: any;
  events: GameEvent[];
  dispatch: Function;
  defer: any;
  time: {
    current: any;
    previous: any;
    delta: any;
    previousDelta: any;
  };
}

type GameSystem = (entities: GameEntities, args: TickArgs) => any;

export { GameSystem, TickArgs };
