import TimerRenderer from '@components/Timer';
import { GAME_DURATION } from '@constants/index';
import { TIMED_EVENTS } from '@constants/timeline';

export default () => {
  const timeRemaining = GAME_DURATION;
  const timedEvents = TIMED_EVENTS;

  return {
    timeRemaining,
    timedEvents,
    renderer: <TimerRenderer currentTime></TimerRenderer>,
  };
};
