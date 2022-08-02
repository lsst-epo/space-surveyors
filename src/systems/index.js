import onResize from './resize';
import { onTimelineEvent, timeline } from './timer';
import {
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
} from './camera';
import {
  cullSkyObjects,
  spawnObjects,
  moveOccludingObjects,
  cullOccludingObjects,
} from './sky';
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
  cullOccludingObjects,
  moveOccludingObjects,
  audioHandler,
];

export default Systems;
