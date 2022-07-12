import { SkyObjectType } from './objects';

export type GamePosition = {
  x: number;
  y: number;
};

export type WeightedOptions = {
  [Key in SkyObjectType]: number;
};
