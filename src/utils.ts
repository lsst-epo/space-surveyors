import Chance from 'chance';
import {
  ASPECT_RATIOS_FLOAT,
  MAX_OBJECT_X,
  MAX_OBJECT_Y,
  MIN_OBJECT_X,
  MIN_OBJECT_Y,
} from '@constants/index';
import { WeightedOptions, GamePosition } from '@shapes/index';

const chance = Chance();

export const convertMsToTime = (milliseconds: number): string => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
};

const parseRelative = (
  position: number,
  offset: number,
  size: number
): number => +(((position - offset) / size) * 100).toFixed(2);

export const getRelativePosition = (
  x: number,
  y: number,
  boundingRect: DOMRectReadOnly
): GamePosition => {
  const { left, top, width, height } = boundingRect;

  return {
    x: parseRelative(x, left, width),
    y: parseRelative(y, top, height),
  };
};

export const getDistanceBetweenPoints = (
  startPosition: GamePosition,
  endPosition: GamePosition
) => {
  const y = endPosition.x - startPosition.x;
  const x = endPosition.y - startPosition.y;

  return Math.sqrt(x * x + y * y);
};

export const getRandomDecimal = (min: number, max: number, fixed: number = 2) =>
  chance.floating({ min, max, fixed });

export const getRandomInt = (min: number, max: number) =>
  chance.integer({ min, max });

export const getNewPosition = (offset: number = 0): GamePosition => ({
  x: getRandomDecimal(MIN_OBJECT_X, MAX_OBJECT_X, 1) - offset,
  y: getRandomDecimal(MIN_OBJECT_Y, MAX_OBJECT_Y, 1) - offset,
});

export const getPositionInQuad = (
  xQuad?: number,
  yQuad?: number
): GamePosition => {
  const xRange = MAX_OBJECT_X - MIN_OBJECT_X;
  const yRange = MAX_OBJECT_Y - MIN_OBJECT_Y;
  const xQuart = xRange / 4;
  const yQuart = yRange / 4;
  const xMin = xQuad ? MIN_OBJECT_X + xQuart * (xQuad - 1) : MIN_OBJECT_X;
  const xMax = xQuad ? MIN_OBJECT_X + xQuart * xQuad : MAX_OBJECT_X;
  const yMin = yQuad ? MIN_OBJECT_Y + yQuart * (yQuad - 1) : MIN_OBJECT_Y;
  const yMax = yQuad ? MIN_OBJECT_Y + yQuart * yQuad : MAX_OBJECT_Y;

  return {
    x: getRandomDecimal(xMin, xMax, 1),
    y: getRandomDecimal(yMin, yMax, 1),
  };
};

export const getRandomWeightedValue = (options: WeightedOptions) => {
  const keys = Object.keys(options);
  const weights = Object.values(options) as number[];

  return chance.weighted(keys, weights);
};

export const closest = (values: number[], test: number) =>
  values.reduce((a, b) => {
    return Math.abs(b - test) < Math.abs(a - test) ? b : a;
  });

export const getAspectRatio = (ratio: number): number =>
  closest(ASPECT_RATIOS_FLOAT, ratio);

export const getAngleBetweenPoints = (
  startPoint: GamePosition,
  endPoint: GamePosition
) =>
  (Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) /
  Math.PI;

export const round = (number: number, fixed: number = 2) =>
  parseFloat(number.toFixed(fixed));
