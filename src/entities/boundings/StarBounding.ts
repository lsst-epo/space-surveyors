export const StarBounding = (width: number = 1) => {
  const base = [
    { x: 0.5, y: 0 },
    { x: 0.609375, y: 0.359375 },
    { x: 1, y: 0.359375 },
    { x: 0.6875, y: 0.578125 },
    { x: 0.8125, y: 0.9375 },
    { x: 0.5, y: 0.71875 },
    { x: 0.1875, y: 0.9375 },
    { x: 0.3125, y: 0.578125 },
    { x: 0, y: 0.359375 },
    { x: 0.390625, y: 0.359375 },
  ];

  return base.map(({ x, y }) => ({
    x: x * width,
    y: y * width,
  }));
};
