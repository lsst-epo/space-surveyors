import onResize from './resize';
import { onTimelineEvent, timeline } from './timer';
import {
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
} from './camera';
import { cullSkyObjects, spawnObjects } from './sky';
import { moveDynamicObjects, cullDynamicObjects } from './dynamicObjects';
import { audioHandler } from './audio';

const Systems = [
  onResize,
  onTimelineEvent,
  timeline,
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
  spawnObjects,
  cullSkyObjects,
  cullDynamicObjects,
  moveDynamicObjects,
  audioHandler,
];

export default Systems;
