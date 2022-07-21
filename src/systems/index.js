import onResize from './resize';
import { onGameStart, onTimeEnd, onTimeStart, timeline } from './timer';
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

const Systems = [
  onResize,
  onGameStart,
  onTimeEnd,
  onTimeStart,
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
];

export default Systems;
