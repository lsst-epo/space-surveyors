export type GamePosition = {
  x: number;
  y: number;
};

export type Edge = 'top' | 'bottom' | 'left' | 'right';

export type WeightedOptions = {
  [key: string | number]: number;
};

export interface RangedValue {
  min: number;
  max: number;
}

export interface TargetedRangedValue extends RangedValue {
  target: number;
}

export interface WeightedBins {
  bins: number[][];
  weights: number[];
}
