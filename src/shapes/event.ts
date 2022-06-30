type GameEventType =
  | 'started'
  | 'resize'
  | 'timeStart'
  | 'timeEnd'
  | 'quit'
  | 'stopped';

interface GameEvent {
  type: GameEventType;
  payload?: any;
}

export { GameEventType, GameEvent };
