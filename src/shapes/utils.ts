export type GamePosition = {
  x: number;
  y: number;
};

export type Edge = 'top' | 'bottom' | 'left' | 'right';

export type WeightedOptions = {
  [key: string | number]: number;
};
