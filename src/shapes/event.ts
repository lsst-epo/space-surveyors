type GameEventType = 'started' | 'resize' | 'timeEnd' | 'quit' | 'stopped';

interface GameEvent {
  type: GameEventType;
  payload?: any;
}

export { GameEventType, GameEvent };
