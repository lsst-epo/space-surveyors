import { System } from 'detect-collisions';
import { Howl } from 'howler';
import { SkyObject } from '@modules/SkyObject/';
import { DynamicSkyObject } from '@modules/DynamicSkyObject';
import { OccludingObject } from '@modules/OccludingObject';
import { SkyObjectType } from './objects';

type GameStage = 'menu' | 'warmup' | 'running' | 'finished';

interface GameState {
  aspectRatio: number;
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  startTime: number;
  endTime: number;
  windSpeed: number;
  stage: GameStage;
  lastScore: any;
  nextSpawn: { [Key in SkyObjectType]: number };
}

interface GameWorld {
  occlusions: System;
  system: System;
}

interface SkyObjects {
  dynamicObjects: DynamicSkyObject[];
  occludingObjects: OccludingObject[];
  staticObjects: SkyObject[];
  capturedObjects: any[];
  showEndgame: boolean;
  showSunrise: boolean;
  fade: boolean;
}

interface GameAudio {
  [key: string]: Howl;
}

interface GameEntities {
  state: GameState;
  backdrop: any;
  timer: any;
  camera: any;
  world: GameWorld;
  score: any;
  skyObjects: SkyObjects;
  audio: GameAudio;
}

export { GameEntities, GameState, GameWorld };
