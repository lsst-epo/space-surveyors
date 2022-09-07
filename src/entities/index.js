import Backdrop from "./backdrop";
import State from "./state";
import Timer from "./timer";
import Camera from "./camera";
import Score from "./score";
import World from "./world";
import SkyObjects from "./skyObjects";
import Audio from "./audio";

export default async (boundingRect, aspectRatio) => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State(boundingRect, aspectRatio);
  const camera = Camera(aspectRatio);
  const score = Score();
  const world = World();
  const skyObjects = await SkyObjects(aspectRatio);
  const audio = Audio();

  world.system.insert(camera.physics);

  skyObjects.staticObjects.forEach((object) => {
    world.system.insert(object.physics);
  });

  return { backdrop, timer, state, camera, score, world, skyObjects, audio };
};
