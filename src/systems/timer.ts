import { GameSystem } from '@shapes/system';
import { GAME_DURATION } from '@constants/index';
import { TimedEvent } from '@shapes/event';

const timeline: GameSystem = (entities, { time, input, dispatch }) => {
  const { timer, state } = entities;
  const { current } = time;
  const { gameStart, startTime, stage } = state;
  const { timedEvents } = timer;

  if (stage !== 'menu') {
    if (stage === 'running') {
      timer.timeRemaining = Math.max(0, GAME_DURATION - (current - startTime));
    }

    if (stage === 'finished') {
      const mouseDown = input.find((x) => x.name === 'onClick');
      if (mouseDown) {
        state.stage = 'menu';
        dispatch({ type: 'quit' });
      }
    }

    if (timedEvents.length > 0) {
      const elapsed = current - gameStart;
      const nextEvent: TimedEvent = timedEvents[0];

      if (nextEvent.time <= elapsed) {
        const { type, payload } = nextEvent;
        dispatch({ type, payload });
        timedEvents.shift();
      }
    }
  }

  return entities;
};

const onTimelineEvent: GameSystem = (entities, { events, time }) => {
  const event = events.find(
    (e) =>
      e.type === 'gameStart' ||
      e.type === 'timeStart' ||
      e.type === 'dawn' ||
      e.type === 'timeEnd' ||
      e.type === 'showFinish'
  );

  if (event) {
    const { state, skyObjects, camera, backdrop } = entities;
    const { current } = time;

    switch (event.type) {
      case 'gameStart':
        return {
          ...entities,
          state: { ...state, stage: 'warmup', gameStart: current },
        };
      case 'timeStart':
        return {
          ...entities,
          state: { ...state, stage: 'running', startTime: current },
        };
      case 'dawn':
        return {
          ...entities,
          backdrop: { ...backdrop, showSunrise: true },
          skyObjects: { ...skyObjects, showSunrise: true },
        };
      case 'showFinish':
        return {
          ...entities,
          backdrop: { ...backdrop, showEndgame: true },
          camera: { ...camera, showEndgame: true },
        };
      case 'timeEnd':
        return {
          ...entities,
          skyObjects: { ...skyObjects, fade: true },
          state: { ...state, stage: 'finished', endTime: current },
          camera: { ...camera, exposureRemaining: null, nextPosition: null },
        };
    }
  }

  return entities;
};

export { timeline, onTimelineEvent };
