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
import { GameAudio } from './audio';

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
  GameAudio,
];

export default Systems;
