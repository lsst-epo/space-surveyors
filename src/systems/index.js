import onResize from "./resize";
import Timeline from "./timer";
import Camera from "./camera";
import SkyObjects from "./sky";
import DynamicObjects from "./dynamicObjects";
import Pause from "./pause";
import Audio from "./audio";

const Systems = [
  // pause needs to go first so other systems
  // have an accurate timer of how much pause time has occurred
  ...Pause,
  ...Audio,
  ...Timeline,
  ...Camera,
  ...SkyObjects,
  ...DynamicObjects,
  onResize,
];

export default Systems;
