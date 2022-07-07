import { GameEntities } from './entities';
import { GameEvent, GameInputEvent } from './event';

type GameEventDispatch = (event: GameEvent) => void;

interface TickArgs {
  input: GameInputEvent[];
  window: Window;
  events: GameEvent[];
  dispatch: GameEventDispatch;
  defer: any;
  time: {
    current: number;
    previous: number;
    delta: number;
    previousDelta: number;
  };
}

type GameSystem = (entities: GameEntities, args: TickArgs) => GameEntities;

export { GameSystem, GameEventDispatch, TickArgs };
