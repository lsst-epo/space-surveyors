import { SkyObjectType } from '@shapes/index';
import { getRandomDecimal, round } from '../../utils';

const OBJECT_SIZE: {
  [Key in SkyObjectType | 'camera']: {
    min: number;
    target?: number;
    max: number;
  };
} = {
  camera: {
    min: 15,
    target: 25,
    max: 30,
  },
  star: {
    min: 0.5,
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
    min: 0.5,
    max: 2.5,
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

export const getScaledObjectSize = (
  type: SkyObjectType | 'camera',
  aspectRatio: number
): number => {
  const { [type]: object } = OBJECT_SIZE;
  const size: number = object.target
    ? object.target
    : getRandomDecimal(object.min, object.max, 1);

  const scaledSize: number = round(size / aspectRatio);

  return object.target
    ? Math.min(Math.max(scaledSize, object.min), object.max)
    : Math.max(scaledSize, object.min);
};
