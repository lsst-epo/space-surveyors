import { SkyObjectType } from '@shapes/objects';
import { WeightedOptions } from '@shapes/utils';

// SCREEN
export const ASPECT_RATIOS: string[] = ['16:9', '4:3', '3:4', '3:5'];
export const ASPECT_RATIOS_FLOAT: number[] = [1.7778, 1.333, 0.75, 0.5625];

// Timeline
export const GAME_TIME: number = 60000;
export const WARMUP_TIME: number = 1000;
export const DAY_TRANSITION_TIME: number = 1000;
export const FINISH_SCREEN_TIME: number = 5000;

// Camera
export const CAMERA_SIZE: number = 20;
export const TARGET_SIZE: number = CAMERA_SIZE / 5;
export const MAX_CAMERA_MOVE: number = 1;
export const EXPOSURE_TIME: number = 5000;

// Collision
export const MIN_OVERLAP: number = 0.5;

// Sky Objects
export const MIN_OBJECT_X: number = 10;
export const MAX_OBJECT_X: number = 90;
export const MIN_OBJECT_Y: number = 15;
export const MAX_OBJECT_Y: number = 98;
export const OBJECTS_PER_SECOND: number = 0.6;
export const MAX_SKY_OBJECTS: number = 20;
export const FADE_TIME: number = 500;
export const OBJECT_LIFESPAN: {
  [Key in SkyObjectType]: { min: number; max: number };
} = {
  star: {
    min: 10000,
    max: 20000,
  },
  asteroid: {
    min: 5000,
    max: 10000,
  },
  comet: {
    min: 5000,
    max: 10000,
  },
  galaxy: {
    min: 5000,
    max: 10000,
  },
  supernova: {
    min: 5000,
    max: 10000,
  },
};
export const OBJECT_SIZE: {
  [Key in SkyObjectType]: { min: number; max: number };
} = {
  star: {
    min: 0.5,
    max: 2,
  },
  asteroid: {
    min: 1,
    max: 3,
  },
  comet: {
    min: 1,
    max: 3,
  },
  galaxy: {
    min: 1,
    max: 3,
  },
  supernova: {
    min: 1,
    max: 3,
  },
};
export const OBJECT_BRIGHTNESS: {
  [Key in SkyObjectType]: { min: number; max: number };
} = {
  star: {
    min: 0.5,
    max: 1,
  },
  asteroid: {
    min: 0.5,
    max: 1,
  },
  comet: {
    min: 0.5,
    max: 1,
  },
  galaxy: {
    min: 0.5,
    max: 1,
  },
  supernova: {
    min: 0.5,
    max: 1,
  },
};
export const WEIGHTED_GENERATION: WeightedOptions = {
  star: 5,
  asteroid: 0,
  comet: 0,
  galaxy: 2,
  supernova: 1,
};
