import { MIN_WIND_SPEED, MAX_WIND_SPEED } from '@constants/index';
import { getRandomDecimal } from 'src/utils';

export default (boundingRect, aspectRatio) => {
  const gameStart = null;
  const startTime = null;
  const endTime = null;
  const stage = 'menu';
  const windSpeed = getRandomDecimal(MIN_WIND_SPEED, MAX_WIND_SPEED, 3);
  const nextSpawn = {
    cloud: 0,
    airplane: 5000,
  };

  return {
    nextSpawn,
    aspectRatio,
    boundingRect,
    gameStart,
    startTime,
    endTime,
    stage,
    windSpeed,
  };
};
