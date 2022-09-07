import { DynamicObject } from "@modules/DynamicObject";
import { GameSystem } from "@shapes/index";

const moveDynamicObject = (object: DynamicObject) => {
  const { x: deltaX, y: deltaY } = object.delta;
  const { x, y } = object.physics;
  object.physics.setPosition(x + deltaX, y + deltaY);
};

const isInsideBounds = (object: DynamicObject): boolean => {
  const { xOffset, yOffset } = object;
  const { x, y } = object.physics;

  if (
    x >= 0 - xOffset &&
    x <= 100 + xOffset &&
    y >= 0 - yOffset &&
    y <= 100 + yOffset
  ) {
    return true;
  }

  return false;
};

const moveDynamicObjects: GameSystem = (entities) => {
  const { skyObjects, state } = entities;
  const { stage } = state;
  const { occludingObjects, movingObjects } = skyObjects;

  if (
    stage !== "paused" &&
    (occludingObjects.length > 0 || movingObjects.length > 0)
  ) {
    occludingObjects.forEach(moveDynamicObject);
    movingObjects.forEach(moveDynamicObject);
  }

  return entities;
};

const cullDynamicObjects: GameSystem = (entities) => {
  const { skyObjects, world } = entities;
  const { occlusions, system } = world;
  const { occludingObjects, movingObjects } = skyObjects;

  if (occludingObjects.length > 0 || movingObjects.length > 0) {
    const remainingOccludingObjects = occludingObjects.filter((object) => {
      if (isInsideBounds(object)) {
        return true;
      }
      occlusions.remove(object.physics);
      return false;
    });

    const remainingMovingObjects = movingObjects.filter((object) => {
      if (isInsideBounds(object)) {
        return true;
      }
      system.remove(object.physics);
      return false;
    });

    return {
      ...entities,
      skyObjects: {
        ...skyObjects,
        occludingObjects: remainingOccludingObjects,
        movingObjects: remainingMovingObjects,
      },
    };
  }

  return entities;
};

export default [moveDynamicObjects, cullDynamicObjects];
