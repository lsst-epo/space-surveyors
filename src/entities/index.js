import Backdrop from './backdrop';
import State from './state';
import Timer from './timer';
import Camera from './camera';
import Score from './score';
import World from './world';
import Objects from './objects';

export default () => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State();
  const camera = Camera();
  const score = Score();
  const world = World();
  const objects = Objects();

  objects.objects.forEach((object) => {
    world.system.insert(object.physics);
  });
  world.system.insert(camera.physics);

  return { backdrop, timer, state, camera, score, world, objects };
};
