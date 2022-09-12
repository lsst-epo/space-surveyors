import { GameSystem } from "@shapes/system";
import cameraConfig from "@constants/objects/camera";
import { getScaledObjectSize, scaleByAspectRatio } from "@lib/utils";
import { SkyObject } from "@modules/SkyObject";
import { DynamicObject } from "@modules/DynamicObject";
import { TimedSkyObject } from "@modules/TimedSkyObject";

const resizeSkyObject = (
  object: SkyObject | DynamicObject | TimedSkyObject,
  aspectRatio: number
) => {
  object.aspectRatio = aspectRatio;
  object.width = getScaledObjectSize(object.config.size, aspectRatio);
  object.physics.setScale(object.width, object.width * aspectRatio);
};

const onResize: GameSystem = (entities, { events }) => {
  const event = events.find((e) => e.type === "resize");

  if (event) {
    const { state, camera, skyObjects } = entities;
    const { payload: dimensions } = event;
    const { aspectRatio } = dimensions;
    const {
      staticObjects,
      timedObjects,
      occludingObjects,
      movingObjects,
      capturedObjects,
    } = skyObjects;

    state.aspectRatio = aspectRatio;

    camera.size = getScaledObjectSize(cameraConfig.size, aspectRatio);
    camera.maxMove = scaleByAspectRatio(
      aspectRatio,
      cameraConfig.speed.target,
      cameraConfig.speed.min,
      cameraConfig.speed.max
    );
    camera.physics.setScale(camera.size, camera.size * aspectRatio);

    [
      staticObjects,
      timedObjects,
      occludingObjects,
      movingObjects,
      capturedObjects,
    ].forEach((objects) => {
      objects.forEach((object) => {
        resizeSkyObject(object, aspectRatio);
      });
    });
  }

  return entities;
};

export default [onResize];
