import onResize from './resize';
import { onGameStart, onTimeEnd, onTimeStart, countdown } from './timer';
import {
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
} from './camera';
import { addSkyObjects, cullSkyObjects } from './sky';

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
  addSkyObjects,
  cullSkyObjects,
];

export default Systems;
