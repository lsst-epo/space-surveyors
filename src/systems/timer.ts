import { GameSystem } from '@shapes/system';
import { FINISH_SCREEN_TIME, GAME_TIME, WARMUP_TIME } from '@constants/index';

const countdown: GameSystem = (entities, { time, dispatch }) => {
  const { timer, state } = entities;
  const { current } = time;
  const { timeRemaining } = timer;
  const { endTime, gameStart, startTime } = state;

  /** track warmup time, then start gameplay */
  if (gameStart && !startTime) {
    if (current - gameStart > WARMUP_TIME) {
      dispatch({ type: 'timeStart' });
    }

    return entities;
  }

  /** track time remaining in gameplay, then end gameplay */
  if (startTime && timeRemaining > 0) {
    const newTimeRemaining = Math.max(0, GAME_TIME - (current - startTime));

    if (newTimeRemaining === 0) {
      dispatch({ type: 'timeEnd' });
    }

    return {
      ...entities,
      timer: { ...timer, timeRemaining: newTimeRemaining },
    };
  }

  /** if an end time has passed, wait alloted time to display the finished screen then quit */
  if (endTime) {
    if (current - endTime > FINISH_SCREEN_TIME) {
      dispatch({ type: 'quit' });
    }
  }

  return entities;
};

/** log the initial start time and enter the warmup state */
const onGameStart: GameSystem = (entities, { events, time }) => {
  const event = events.find((e) => e.type === 'started');

  if (event) {
    const { state } = entities;
    const { current } = time;

    return {
      ...entities,
      state: { ...state, gameStart: current },
    };
  }

  return entities;
};

const onTimeStart: GameSystem = (entities, { events, time }) => {
  const event = events.find((e) => e.type === 'timeStart');

  if (event) {
    const { state } = entities;
    const { current } = time;

    return {
      ...entities,
      state: { ...state, startTime: current },
    };
  }

  return entities;
};

const onTimeEnd: GameSystem = (entities, { events, time }) => {
  const event = events.find((e) => e.type === 'timeEnd');

  if (event) {
    const { current } = time;
    const { backdrop, state, skyObjects, camera } = entities;
    const showEndgame = true;

    return {
      ...entities,
      camera: { ...camera, exposureRemaining: null, nextPosition: null },
      skyObjects: { ...skyObjects, showEndgame },
      backdrop: { ...backdrop, showEndgame },
      state: { ...state, endTime: current },
    };
  }

  return entities;
};

export { countdown, onGameStart, onTimeStart, onTimeEnd };
