import { FIRST_SPAWN } from "@constants/index";

export default (aspectRatio) => {
  const gameStart = null;
  const timerStart = null;
  const endTime = null;
  const timePaused = 0;
  const stage = "paused";
  const pauseState = {
    events: [],
    lastStage: null,
    timestamp: null,
  };
  const nextSpawn = { ...FIRST_SPAWN };
  const lastScore = 0;

  return {
    nextSpawn,
    aspectRatio,
    gameStart,
    timerStart,
    endTime,
    stage,
    lastScore,
    pauseState,
    timePaused,
  };
};
