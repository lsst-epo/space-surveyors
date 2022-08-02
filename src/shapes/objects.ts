export type SkyObjectType =
  | 'star'
  | 'asteroid'
  | 'comet'
  | 'galaxy'
  | 'supernova'
  | 'cloud'
  | 'airplane';

export interface RangedValue {
  min: number;
  max: number;
}

export interface WeightedBins {
  bins: number[][];
  weights: number[];
}
