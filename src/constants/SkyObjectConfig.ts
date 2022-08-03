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
      [0, 0.1],
      [0.1, 0.2],
      [0.2, 0.3],
      [0.3, 0.4],
      [0.4, 0.5],
      [0.5, 0.6],
      [0.6, 0.7],
      [0.7, 0.8],
      [0.8, 0.9],
      [0.9, 1],
    ],
    weights: [0, 0.01, 0.03, 0.17, 0.4, 0.57, 0.42, 0.22, 0.04, 0.01],
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
