import { FIRST_SPAWN } from '@constants/index';
import { getRandomDecimal } from 'src/utils';

export default (boundingRect, aspectRatio) => {
  const gameStart = null;
  const startTime = null;
  const endTime = null;
  const stage = 'menu';
  const nextSpawn = { ...FIRST_SPAWN };
  const lastScore = 0;

  return {
    nextSpawn,
    aspectRatio,
    boundingRect,
    gameStart,
    startTime,
    endTime,
    stage,
    lastScore,
  };
};
