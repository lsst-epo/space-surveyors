type GameState = {
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  startTime: number;
  endTime: number;
};

type GameEntities = {
  state: GameState;
  backdrop: any;
  timer: any;
  camera: any;
};

export { GameEntities, GameState };
