import { System } from 'detect-collisions';
import { SkyObject } from '@entities/skyObjects/skyObject';

type GameState = {
  aspectRatio: number;
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  startTime: number;
  endTime: number;
};

type GameWorld = {
  system: System;
};

type SkyObjects = {
  objects: SkyObject[];
  capturedObjects: any[];
  showEndgame: boolean;
};

type GameEntities = {
  state: GameState;
  backdrop: any;
  timer: any;
  camera: any;
  world: GameWorld;
  score: any;
  skyObjects: SkyObjects;
};

export { GameEntities, GameState, GameWorld };
