import {
  MAX_DYNAMIC_OBJECTS,
  MAX_OCCLUDING_OBJECTS,
  SPAWN_INTERVAL,
} from '@constants/index';
import { DynamicObject } from '@modules/DynamicObject';
import { GameState, GameSystem, SkyObjectType } from '@shapes/index';
import { System } from 'detect-collisions';
import { getRandomInt } from '../utils';

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

export const spawnDynamicObject = (
  type: SkyObjectType,
  objects: DynamicObject[],
  system: System,
  state: GameState,
  group: string
) => {
  const rateLimit = {
    cloud: MAX_OCCLUDING_OBJECTS,
    airplane: MAX_OCCLUDING_OBJECTS,
    asteroid: MAX_DYNAMIC_OBJECTS,
    comet: MAX_DYNAMIC_OBJECTS,
  };

  if (objects.length < rateLimit[type]) {
    const { aspectRatio } = state;
    const newOcclusion = new DynamicObject(type, aspectRatio);
    objects.push(newOcclusion);
    system.insert(newOcclusion.physics);
  }

  state.nextSpawn[group] += getRandomInt(
    SPAWN_INTERVAL[group].min,
    SPAWN_INTERVAL[group].max
  );
};

export const moveDynamicObjects: GameSystem = (entities) => {
  const { skyObjects, state } = entities;
  const { stage } = state;
  const { occludingObjects, movingObjects } = skyObjects;

  if (
    stage !== 'menu' &&
    (occludingObjects.length > 0 || movingObjects.length > 0)
  ) {
    occludingObjects.forEach(moveDynamicObject);
    movingObjects.forEach(moveDynamicObject);
  }

  return entities;
};

export const cullDynamicObjects: GameSystem = (entities) => {
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
