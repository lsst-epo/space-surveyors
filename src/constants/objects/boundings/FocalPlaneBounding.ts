export const FocalPlaneBounding = (xScale: number = 1, yScale: number = 1) => {
  const base = [
    { x: 0.2, y: 0 },
    { x: 0.8, y: 0 },
    { x: 0.867, y: 0.067 },
    { x: 0.933, y: 0.133 },
    { x: 1, y: 0.2 },
    { x: 1, y: 0.8 },
    { x: 0.933, y: 0.867 },
    { x: 0.867, y: 0.933 },
    { x: 0.8, y: 1 },
    { x: 0.2, y: 1 },
    { x: 0.133, y: 0.933 },
    { x: 0.067, y: 0.867 },
    { x: 0, y: 0.8 },
    { x: 0, y: 0.2 },
    { x: 0.067, y: 0.133 },
    { x: 0.133, y: 0.067 },
  ];

  return base.map(({ x, y }) => ({
    x: x * xScale,
    y: y * yScale,
  }));
};
