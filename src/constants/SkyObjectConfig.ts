import { SkyObjectType, WeightedOptions } from '@shapes/index';

export const OBJECT_LIFESPAN: {
  [key: string]: { min: number; max: number };
} = {
  asteroid: {
    min: 5000,
    max: 10000,
  },
  comet: {
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
  cloud: {
    min: 15,
    max: 30,
  },
  airplane: {
    min: 3,
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
  cloud: {
    min: 1,
    max: 1,
  },
  airplane: {
    min: 1,
    max: 1,
  },
};
export const WEIGHTED_GENERATION: WeightedOptions = {
  star: 5,
  asteroid: 0,
  comet: 0,
  galaxy: 2,
  supernova: 1,
  cloud: 1,
};
