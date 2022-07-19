import { Edge } from '@shapes/utils';

export const SPAWN_LOCATION: any = {
  cloud: {
    x: {
      1: 4,
      2: 3,
      3: 1,
      4: 0,
    },
    y: {
      1: 1,
      2: 2,
      3: 2,
      4: 1,
    },
  },
  airplane: {
    x: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
    y: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
  },
};

export const STARTING_EDGES: { [Key in Edge]: number } = {
  left: 1,
  right: 1,
  top: 3,
  bottom: 3,
};
export const ENDING_EDGES: { [Key in Edge]: number } = {
  left: 1,
  right: 1,
  top: 2,
  bottom: 2,
};
