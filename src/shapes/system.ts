import { GameEvent } from './event';

interface GameEntities {
  state: any;
  backdrop: any;
  timer: any;
}

interface TickArgs {
  input: any;
  window: any;
  events: GameEvent[];
  dispatch: (GameEvent) => void;
  defer: any;
  time: {
    current: number;
    previous: number;
    delta: number;
    previousDelta: number;
  };
}

type GameSystem = (entities: GameEntities, args: TickArgs) => GameEntities;

export { GameSystem, TickArgs };
