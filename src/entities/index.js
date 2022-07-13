import Backdrop from './backdrop';
import State from './state';
import Timer from './timer';
import Camera from './camera';
import Score from './score';
import World from './world';
import SkyObjects from './skyObjects';

export default (boundingRect, aspectRatio) => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State(boundingRect, aspectRatio);
  const camera = Camera(aspectRatio);
  const score = Score();
  const world = World();
  const skyObjects = SkyObjects();

  world.system.insert(camera.physics);

  return { backdrop, timer, state, camera, score, world, skyObjects };
};