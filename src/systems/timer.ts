import { GameSystem } from "@shapes/system";
import { GAME_DURATION } from "@constants/index";
import { TimedEvent } from "@shapes/event";
import { timeFromGameStart, timeFromTimerStart } from "@lib/utils";

const timeline: GameSystem = (entities, { time, input, dispatch }) => {
  const { timer, state } = entities;
  const { current } = time;
  const { stage } = state;
  const { timedEvents } = timer;

  if (stage !== "paused") {
    if (stage === "running") {
      timer.timeRemaining = Math.max(
        0,
        GAME_DURATION - timeFromTimerStart(current, state)
      );
    }

    if (stage === "finished") {
      const mouseDown = input.find((x) => x.name === "onClick");
      if (mouseDown) {
        state.stage = "paused";
        dispatch({ type: "quit" });
      }
    }

    if (timedEvents.length > 0) {
      const nextEvent: TimedEvent = timedEvents[0];

      if (nextEvent.time <= timeFromGameStart(current, state)) {
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
      e.type === "gameStart" ||
      e.type === "timeStart" ||
      e.type === "dawn" ||
      e.type === "timeEnd" ||
      e.type === "showFinish"
  );

  if (event) {
    const { state, skyObjects, camera, backdrop } = entities;
    const { current } = time;

    switch (event.type) {
      case "gameStart":
        return {
          ...entities,
          state: { ...state, stage: "warmup", gameStart: current },
        };
      case "timeStart":
        return {
          ...entities,
          state: {
            ...state,
            stage: "running",
            timerStart: current,
            // reset time paused so pauses that occur during warmup
            // do not impact game time
            timePaused: 0,
          },
        };
      case "dawn":
        return {
          ...entities,
          backdrop: { ...backdrop, showSunrise: true },
          skyObjects: { ...skyObjects, showSunrise: true },
        };
      case "showFinish":
        return {
          ...entities,
          backdrop: { ...backdrop, showEndgame: true },
          camera: { ...camera, showEndgame: true },
        };
      case "timeEnd":
        return {
          ...entities,
          skyObjects: { ...skyObjects, fade: true },
          state: { ...state, stage: "finished", endTime: current },
          camera: { ...camera, exposureRemaining: null, nextPosition: null },
        };
    }
  }

  return entities;
};

export default [timeline, onTimelineEvent];
