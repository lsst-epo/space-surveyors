import { GameAudio, GameSystem } from "@shapes/index";

const pauseAudio = (audio: GameAudio) => {
  Object.keys(audio.instances).forEach((group) => {
    audio[group].pause();
  });
};

const resumeAudio = (audio: GameAudio) => {
  Object.keys(audio.instances).forEach((group) => {
    Object.keys(audio.instances[group]).forEach((sprite) => {
      const id = audio.instances[group][sprite];
      if (id) {
        audio[group].play(id);
      }
    });
  });
};

const handlePause: GameSystem = (entities, { events, time }) => {
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
    pauseAudio(audio);

    // get the time the pause started
    pauseState.timestamp = current;

    // get all the events apart from pausing that were running before pause
    pauseState.events = events.filter(
      (event) => event.type !== "stopped" && event.type !== "pause"
    );
  }

  return entities;
};

const handleResume: GameSystem = (entities, { events, time, dispatch }) => {
  const event = events.find((e) => e.type === "unpause");
  const { state } = entities;
  const { pauseState } = state;
  const { lastStage } = pauseState;

  if (
    event &&
    state.stage === "paused" &&
    lastStage &&
    lastStage !== "paused"
  ) {
    const { audio, camera } = entities;
    const { current } = time;

    // restore running or warmup status
    state.stage = lastStage;

    // time elapsed on previous pause
    const timeElapsed = current - pauseState.timestamp;

    // move the exposure start time forward if an exposure was running
    // so the exposure finishes with the correct amount of time
    if (camera.exposureStartTime) {
      camera.exposureStartTime += timeElapsed;
    }
    camera.paused = false;

    // resume all audio that was previously playing
    resumeAudio(audio);

    // add to the total time paused
    state.timePaused += timeElapsed;

    // dispatch each event that occurred on the last tick before pause
    pauseState.events.forEach(dispatch);
  }

  return entities;
};

export default [handlePause, handleResume];
