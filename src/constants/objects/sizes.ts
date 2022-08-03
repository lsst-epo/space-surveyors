import { SkyObjectType, WeightedBins } from '@shapes/index';

export const OBJECT_SIZE: {
  [Key in SkyObjectType | 'camera']:
    | {
        min: number;
        target?: number;
        max: number;
      }
    | WeightedBins;
} = {
  camera: {
    min: 15,
    target: 25,
    max: 30,
  },
  star: {
    min: 0.75,
    max: 2.5,
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
    bins: [
      [0.75, 0.925],
      [0.925, 1.1],
      [1.1, 1.275],
      [1.275, 1.45],
      [1.45, 1.625],
      [1.625, 1.8],
      [1.8, 1.975],
      [1.975, 2.15],
      [2.15, 2.325],
      [2.325, 2.5],
    ],
    weights: [0.05, 0.3, 0.5, 0.46, 0.25, 0.15, 0.08, 0.06, 0.03, 0.02],
  },
  supernova: {
    min: 1,
    max: 3,
  },
  cloud: {
    min: 20,
    max: 40,
  },
  airplane: {
    min: 3,
    max: 3,
  },
};
