import TimerRenderer from '@components/Timer';
import { GAME_DURATION, TIMED_EVENTS } from '@constants/index';

export default () => {
  const timeRemaining = GAME_DURATION;
  const timedEvents = [...TIMED_EVENTS];

  return {
    timeRemaining,
    timedEvents,
    timedEvents,
    renderer: <TimerRenderer currentTime></TimerRenderer>,
  };
};
