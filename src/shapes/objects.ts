import { Edge, RangedValue, TargetedRangedValue, WeightedBins } from '.';

export type SkyObjectType =
  | 'star'
  | 'asteroid'
  | 'comet'
  | 'galaxy'
  | 'supernova'
  | 'cloud';

export interface ObjectConfig {
  brightness: RangedValue | WeightedBins;
  size: RangedValue | WeightedBins;
}

export interface TimedObjectConfig extends ObjectConfig {
  lifespan: RangedValue;
}

export interface DynamicObjectConfig extends ObjectConfig {
  spawnEdge: { [Key in Edge]: number };
  baseRotation: number;
  speed: TargetedRangedValue;
  onlyMovesHorizontal: boolean;
}
