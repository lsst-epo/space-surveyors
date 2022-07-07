import { CameraPosition } from '@shapes/camera';

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
): CameraPosition => {
  const { left, top, width, height } = boundingRect;

  return {
    x: parseRelative(x, left, width),
    y: parseRelative(y, top, height),
  };
};

// export const AngleBetweenPoints = (x1, y1, x2, y2) =>
//   Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

// export function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //prettier-ignore
// export function isPointInCircle(pt, center, r) {
//   console.log(pt, center, r);

//   const lhs = Math.pow(center[0] - pt[0], 2) + Math.pow(center[1] - pt[1], 2);
//   const rhs = Math.pow(r, 2);

//   return lhs < rhs ? -1 : (lhs === rhs ? 0 : 1);
// }

// export const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

export const getDistanceBetweenPoints = (
  startPosition: CameraPosition,
  endPosition: CameraPosition
) => {
  const y = endPosition.x - startPosition.x;
  const x = endPosition.y - startPosition.y;

  return Math.sqrt(x * x + y * y);
};

export const getRandomDecimal = (
  min: number,
  max: number,
  places: number = 2
) => {
  const value = Math.random() * (max - min + 1) + min;
  console.log(value.toFixed(places));
  return Number(value.toFixed(places));
};
