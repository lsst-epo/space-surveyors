import onResize from './resize';
import { onGameStart, onTimeEnd, onTimeStart, countdown } from './timer';
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
  countdown,
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
