// SCREEN
export const ASPECT_RATIOS: string[] = ['16:9', '4:3', '3:4', '3:5'];
export const ASPECT_RATIOS_FLOAT: number[] = [1.7778, 1.333, 0.75, 0.5625];

// Timeline
export const GAME_TIME: number = 60000;
export const WARMUP_TIME: number = 1000;
export const DAY_TRANSITION_TIME: number = 1000;
export const FINISH_SCREEN_TIME: number = 5000;

// Camera
export const CAMERA_SIZE: number = 15;
export const TARGET_SIZE: number = CAMERA_SIZE / 5;
export const MAX_CAMERA_MOVE: number = 1;
export const EXPOSURE_TIME: number = 5000;

// Collision
export const MIN_OVERLAP: number = 0.5;

// Spawn
export const FIRST_SPAWN: any = {
  cloud: 0,
  airplane: 5000,
  supernova: 3000,
};
export const SPAWN_INTERVAL: any = {
  cloud: {
    min: 5000,
    max: 12000,
  },
  airplane: {
    min: 10000,
    max: 20000,
  },
  supernova: {
    min: 3000,
    max: 5000,
  },
};

// Sky Objects
export const MIN_OBJECT_X: number = 10;
export const MAX_OBJECT_X: number = 90;
export const MIN_OBJECT_Y: number = 15;
export const MAX_OBJECT_Y: number = 98;
export const OBJECTS_PER_SECOND: number = 0.6;
export const MAX_STATIC_OBJECTS: number = 15;
export const MAX_DYNAMIC_OBJECTS: number = 10;
export const FADE_TIME: number = 500;
export * from '@constants/SkyObjectConfig';

// Occlusions
export const MAX_OCCLUDING_OBJECTS: number = 8;
export const MIN_WIND_SPEED: number = 0.015;
export const MAX_WIND_SPEED: number = 0.035;
export const AIRPLANE_SPEED: number = 0.035;
export * from '@constants/OcclusionConfig';
