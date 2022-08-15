import {
  ObjectConfig,
  TimedObjectConfig,
  DynamicObjectConfig,
} from '@shapes/index';
import StarConfig from '@constants/objects/star';
import GalaxyConfig from '@constants/objects/galaxy';
import SupernovaConfig from '@constants/objects/supernova';
import CloudConfig from '@constants/objects/cloud';
import AirplaneConfig from '@constants/objects/airplane';
import AsteroidConfig from '@constants/objects/asteroid';
import CometConfig from '@constants/objects/comet';

export const SkyObjectConfigs: {
  [key: string]:
    | ObjectConfig
    | TimedObjectConfig
    | DynamicObjectConfig
    | (() => ObjectConfig | TimedObjectConfig | DynamicObjectConfig);
} = {
  star: () => StarConfig(),
  galaxy: GalaxyConfig,
  supernova: SupernovaConfig,
  cloud: CloudConfig,
  airplane: AirplaneConfig,
  asteroid: AsteroidConfig,
  comet: CometConfig,
};
