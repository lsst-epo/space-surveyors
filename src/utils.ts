import { Random, MersenneTwister19937 } from 'random-js-no-node';
import weighted from 'weighted';
import {
  ASPECT_RATIOS_FLOAT,
  MAX_OBJECT_X,
  MAX_OBJECT_Y,
  MIN_OBJECT_X,
  MIN_OBJECT_Y,
  X_RANGE,
  Y_RANGE,
} from '@constants/index';
import { WeightedOptions, GamePosition } from '@shapes/index';

const engine = MersenneTwister19937.autoSeed();
const random = new Random(engine);

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
  endPosition: GamePosition,
  aspectRatio: number = 1
) => {
  const x = endPosition.x - startPosition.x;
  const y = (endPosition.y - startPosition.y) / aspectRatio;

  return Math.sqrt(x * x + y * y);
};

export const getRandomDecimal = (min: number, max: number, fixed: number = 2) =>
  parseFloat(random.real(min, max).toFixed(fixed));

export const getRandomInt = (min: number, max: number) =>
  random.integer(min, max);

export const getNewPosition = (offset: number = 0): GamePosition => ({
  x: getRandomDecimal(MIN_OBJECT_X, MAX_OBJECT_X, 1) - offset,
  y: getRandomDecimal(MIN_OBJECT_Y, MAX_OBJECT_Y, 1) - offset,
});

export const getPositionInQuad = (
  xQuad: number = 1,
  yQuad: number = 1
): GamePosition => getPositionInCell(xQuad, yQuad, 4, 4);

export const getPositionInCell = (
  row: number,
  column: number,
  totalRows: number,
  totalColumns: number
): GamePosition => {
  const xCell = X_RANGE / totalRows;
  const yCell = Y_RANGE / totalColumns;
  const xMin = row ? MIN_OBJECT_X + xCell * (row - 1) : MIN_OBJECT_X;
  const xMax = row ? MIN_OBJECT_X + xCell * row : MAX_OBJECT_X;
  const yMin = column ? MIN_OBJECT_Y + yCell * (column - 1) : MIN_OBJECT_Y;
  const yMax = column ? MIN_OBJECT_Y + yCell * column : MAX_OBJECT_Y;

  return {
    x: getRandomDecimal(xMin, xMax, 1),
    y: getRandomDecimal(yMin, yMax, 1),
  };
};

export const getRandomWeightedValue = (items: WeightedOptions) =>
  weighted.select(items, {
    rand: () => random.realZeroToOneInclusive(),
  });

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

export const sum = (values: number[]): number =>
  values.reduce((accumulator, value) => accumulator + value, 0);
