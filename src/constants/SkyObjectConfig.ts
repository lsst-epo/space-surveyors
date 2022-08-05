import {
  ObjectConfig,
  TimedObjectConfig,
  DynamicObjectConfig,
  WeightedOptions,
} from '@shapes/index';
import StarConfig from '@constants/objects/star';
import GalaxyConfig from '@constants/objects/galaxy';
import SupernovaConfig from '@constants/objects/supernova';
import CloudConfig from '@constants/objects/cloud';
import AirplaneConfig from '@constants/objects/airplane';
import AsteroidConfig from '@constants/objects/asteroid';
import CometConfig from '@constants/objects/comet';

export const WEIGHTS_DYNAMIC: WeightedOptions = {
  asteroid: 5,
  comet: 2,
  supernova: 10,
};

export const WEIGHTS_OCCLUSION: WeightedOptions = {
  cloud: 4,
  airplane: 1,
};

export const WEIGHTS_SPAWN = {
  dynamic: WEIGHTS_DYNAMIC,
  occlusion: WEIGHTS_OCCLUSION,
};

export const WEIGHTS_STATIC: WeightedOptions = {
  star: 5,
  galaxy: 2,
};

export const SkyObjectConfigs: {
  [key: string]: ObjectConfig | TimedObjectConfig | DynamicObjectConfig;
} = {
  star: StarConfig,
  galaxy: GalaxyConfig,
  supernova: SupernovaConfig,
  cloud: CloudConfig,
  airplane: AirplaneConfig,
  asteroid: AsteroidConfig,
  comet: CometConfig,
};
