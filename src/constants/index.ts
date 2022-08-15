// SCREEN
export const ASPECT_RATIOS: string[] = [
  '1.85:1',
  '16:9',
  '16:10',
  '4:3',
  '1:1',
  '3:4',
  '2:3',
  '3:5',
];
export const ASPECT_RATIOS_FLOAT: number[] = [
  1.85, 1.7778, 1.6, 1.3333, 1, 0.75, 0.6667, 0.6,
];
export const GAME_FIELD_SIZE: number = 0.8;
export const HUD_SIZE: number = 0.2;
export const MENU_SLIDE_TIME: number = 500;
export const MENU_SLIDE_DELAY: number = 200;
export const MENU_TRANSITION_TIME: number = MENU_SLIDE_TIME + MENU_SLIDE_DELAY;

// Camera
export const MIN_CAMERA_MOVE: number = 0.16;
export const CAMERA_MOVE: number = MIN_CAMERA_MOVE * 1.5;
export const MAX_CAMERA_MOVE: number = MIN_CAMERA_MOVE * 2;
export const EXPOSURE_TIME: number = 3500;

// Collision
export const MIN_OVERLAP: number = 0.5;

// Spawn
export const FIRST_SPAWN: any = {
  occlusion: 0,
  observable: 1000,
};
export const SPAWN_INTERVAL: any = {
  occlusion: {
    min: 5000,
    max: 10000,
  },
  observable: {
    min: 3000,
    max: 5000,
  },
};

// Sky Objects
export const MIN_OBJECT_X: number = 10;
export const MAX_OBJECT_X: number = 90;
export const MIN_OBJECT_Y: number = 15;
export const MAX_OBJECT_Y: number = 98;
export const X_RANGE: number = MAX_OBJECT_X - MIN_OBJECT_X;
export const Y_RANGE: number = MAX_OBJECT_Y - MIN_OBJECT_Y;
export const STATIC_ROWS: number = 2;
export const STATIC_COLUMNS: number = 4;
export const STATIC_CELLS: number = STATIC_ROWS * STATIC_COLUMNS;
export const STATIC_OBJECTS_PER_CELL: number = 4;
export const FADE_TIME: number = 500;
export * from '@constants/spawn';
export * from '@constants/SkyObjectConfig';

// Game Timeline
export * from '@constants/timeline';
