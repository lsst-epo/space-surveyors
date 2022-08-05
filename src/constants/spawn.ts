import { WeightedOptions } from '@shapes/index';

export const MAX_DYNAMIC_OBJECTS: number = 10;
export const MAX_TIMED_OBJECTS: number = 10;
export const MAX_OCCLUDING_OBJECTS: number = 8;

export const WEIGHTS_DYNAMIC: WeightedOptions = {
  asteroid: 5,
  comet: 1,
  supernova: 10,
};

export const WEIGHTS_OCCLUSION: WeightedOptions = {
  cloud: 4,
  airplane: 1,
};

export const WEIGHTS_SPAWN = {
  dynamic: WEIGHTS_DYNAMIC,
  occlusion: WEIGHTS_OCCLUSION,
};

export const WEIGHTS_STATIC: WeightedOptions = {
  star: 5,
  galaxy: 2,
};
