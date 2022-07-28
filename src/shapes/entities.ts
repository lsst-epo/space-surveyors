import { System } from 'detect-collisions';
import { SkyObject } from '@modules/SkyObject/';
import { DynamicSkyObject } from '@modules/DynamicSkyObject';
import { OccludingObject } from '@modules/OccludingObject';
import { SkyObjectType } from './objects';

type GameStage = 'menu' | 'warmup' | 'running' | 'finished';

type GameState = {
  aspectRatio: number;
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  startTime: number;
  endTime: number;
  windSpeed: number;
  stage: GameStage;
  nextSpawn: { [Key in SkyObjectType]: number };
};

type GameWorld = {
  occlusions: System;
  system: System;
};

type SkyObjects = {
  dynamicObjects: DynamicSkyObject[];
  occludingObjects: OccludingObject[];
  staticObjects: SkyObject[];
  capturedObjects: any[];
  showEndgame: boolean;
  showSunrise: boolean;
  fade: boolean;
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
