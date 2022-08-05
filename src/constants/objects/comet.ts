import AsteroidConfig from './asteroid';

const { min, target, max } = AsteroidConfig.speed;
const cometSpeedScalar = 1.5;

export default {
  brightness: {
    min: 1,
    max: 1,
  },
  size: {
    min: 1.5,
    max: 2.5,
  },
  spawnEdge: { left: 1, right: 1, top: 3, bottom: 3 },
  speed: {
    min: min * cometSpeedScalar,
    target: target * cometSpeedScalar,
    max: max * cometSpeedScalar,
  },
  baseRotation: 25,
  onlyMovesHorizontal: false,
};
