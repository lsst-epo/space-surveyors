import TimerRenderer from '@components/Timer';
import { GAME_TIME } from '@constants/';

export default () => {
  const timeRemaining = GAME_TIME;

  return {
    timeRemaining,
    renderer: <TimerRenderer currentTime></TimerRenderer>,
  };
};
