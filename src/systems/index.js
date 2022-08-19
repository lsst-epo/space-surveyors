import onResize from "./resize";
import { onTimelineEvent, timeline } from "./timer";
import {
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
} from "./camera";
import { cullSkyObjects, spawnObjects } from "./sky";
import { moveDynamicObjects, cullDynamicObjects } from "./dynamicObjects";
import { handlePause, handleResume } from "./pause";
import { audioHandler } from "./audio";

const Systems = [
  // pause needs to go first so other systems
  // have an accurate timer of how much pause time has occurred
  handlePause,
  handleResume,
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
