import { System } from "detect-collisions";
import { Howl } from "howler";
import { SkyObject } from "@modules/SkyObject/";
import { TimedSkyObject } from "@modules/TimedSkyObject";
import { DynamicObject } from "@modules/DynamicObject";
import { SkyObjectType } from "./objects";
import { GameEvent } from "./event";

type GameStage = "menu" | "warmup" | "running" | "finished" | "paused";

interface GameState {
  aspectRatio: number;
  boundingRect: DOMRectReadOnly;
  gameStart: number;
  timerStart: number;
  endTime: number;
  timePaused: number;
  stage: GameStage;
  lastScore: any;
  pauseState: {
    audio: string[];
    timestamp: number;
    lastStage: GameStage;
    events: GameEvent[];
  };
  nextSpawn: { [Key in SkyObjectType]: number };
}

interface GameWorld {
  occlusions: System;
  system: System;
}

interface SkyObjects {
  timedObjects: TimedSkyObject[];
  movingObjects: DynamicObject[];
  occludingObjects: DynamicObject[];
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

export { GameEntities, GameState, GameWorld, GameAudio };
