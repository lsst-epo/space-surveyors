const MIN_CAMERA_MOVE: number = 0.16;

export default {
  size: { min: 15, target: 25, max: 30 },
  speed: {
    min: MIN_CAMERA_MOVE,
    target: MIN_CAMERA_MOVE * 1.5,
    max: MIN_CAMERA_MOVE * 2,
  },
};
