import { GameAudio, GameSystem } from "@shapes/index";

const pauseAudio = (audio: GameAudio, savedAudio: string[]) => {
  Object.keys(audio).forEach((key) => {
    if (audio[key].playing()) {
      savedAudio.push(key);
      audio[key].pause();
    }
  });
};

const resumeAudio = (audio: GameAudio, savedAudio: string[]) => {
  savedAudio.forEach((key) => {
    if (audio[key] && !audio[key].playing()) {
      audio[key].play();
    }
  });
};

const handlePause: GameSystem = (entities, { events, dispatch, time }) => {
  const pause = events.find((e) => e.type === "pause");
  const { state } = entities;

  if (pause && (state.stage === "running" || state.stage === "warmup")) {
    const { audio, camera } = entities;
    const { current } = time;
    const { pauseState } = state;

    // saves whether the game is warming up or running then pauses it
    pauseState.lastStage = state.stage;
    state.stage = "paused";

    // pauses camera animations
    camera.paused = true;

    // pause all audio and record what audio was playing
    pauseAudio(audio, pauseState.audio);

    // get the time the pause started
    pauseState.timestamp = current;

    // get all the events apart from pausing that were running before pause
    pauseState.events = events.filter(
      (event) =>
        event.type !== "stop" &&
        event.type !== "stopped" &&
        event.type !== "pause"
    );

    dispatch({ type: "stop" });
  }

  return entities;
};

const handleResume: GameSystem = (entities, { events, time, dispatch }) => {
  const event = events.find((e) => e.type === "started");
  const { state } = entities;

  if (event && state.stage === "paused") {
    const { audio, camera } = entities;
    const { current } = time;
    const { pauseState } = state;

    // restore running or warmup status
    state.stage = pauseState.lastStage;

    // time elapsed on previous pause
    const timeElapsed = current - pauseState.timestamp;

    // move the exposure start time forward if an exposure was running
    // so the exposure finishes with the correct amount of time
    if (camera.exposureStartTime) {
      camera.exposureStartTime += timeElapsed;
    }
    camera.paused = false;

    // resume all audio that was previously playing
    resumeAudio(audio, pauseState.audio);
    pauseState.audio = [];

    // add to the total time paused
    state.timePaused += timeElapsed;

    // dispatch each event that occurred on the last tick before pause
    pauseState.events.forEach(dispatch);
  }

  return entities;
};

export { handlePause, handleResume };
