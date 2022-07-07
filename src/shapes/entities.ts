import { System } from 'detect-collisions';

type GameState = {
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  startTime: number;
  endTime: number;
};

type GameWorld = {
  system: System;
};

type GameEntities = {
  state: GameState;
  backdrop: any;
  timer: any;
  camera: any;
  world: GameWorld;
  score: any;
  objects: any;
};

export { GameEntities, GameState, GameWorld };
