import onResize from './resize';
import { onGameStart, onTimeEnd, onTimeStart, countdown } from './timer';

const Systems = [onResize, onGameStart, onTimeEnd, onTimeStart, countdown];

export default Systems;
