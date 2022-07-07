export const FocalPlaneBounding = (width) => {
  const focalUnits = 15;
  const focalUnitWidth = width / focalUnits;
  const base = [
    { x: 3, y: 0 },
    { x: 12, y: 0 },
    { x: 13, y: 1 },
    { x: 14, y: 2 },
    { x: 15, y: 3 },
    { x: 15, y: 12 },
    { x: 14, y: 13 },
    { x: 13, y: 14 },
    { x: 12, y: 15 },
    { x: 3, y: 15 },
    { x: 2, y: 14 },
    { x: 1, y: 13 },
    { x: 0, y: 12 },
    { x: 0, y: 3 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
  ];

  return base.map(({ x, y }) => ({
    x: x * focalUnitWidth,
    y: y * focalUnitWidth,
  }));
};
