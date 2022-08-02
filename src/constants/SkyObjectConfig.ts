import {
  RangedValue,
  SkyObjectType,
  WeightedBins,
  WeightedOptions,
} from '@shapes/index';

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
export const OBJECT_BRIGHTNESS: {
  [Key in SkyObjectType]: RangedValue | WeightedBins;
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
    bins: [
      [0, 0.125],
      [0.125, 0.25],
      [0.25, 0.375],
      [0.375, 0.5],
      [0.5, 0.625],
      [0.625, 0.75],
      [0.75, 0.875],
      [0.875, 1],
    ],
    weights: [0, 0.05, 0.11, 0.31, 0.78, 1, 0.09, 0],
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
