import { GameEntities } from './entities';
import { GameEvent, GameInputEvent } from './event';

interface TickArgs {
  input: GameInputEvent[];
  window: Window;
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
