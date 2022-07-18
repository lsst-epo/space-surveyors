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
  spawnSkyObjects,
  cullSkyObjects,
  spawnOccludingObjects,
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
  spawnSkyObjects,
  spawnOccludingObjects,
  cullSkyObjects,
  cullOccludingObjects,
  moveOccludingObjects,
];

export default Systems;
