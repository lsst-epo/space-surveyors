import {
  GameSystem,
  GamePosition,
  GameState,
  SkyObjectType,
} from '@shapes/index';
import {
  FADE_TIME,
  MAX_DYNAMIC_OBJECTS,
  OBJECTS_PER_SECOND,
  // OBJECT_SIZE,
  SPAWN_INTERVAL,
  // SPAWN_LOCATION,
  WEIGHTED_GENERATION,
} from '@constants/index';
import {
  // getPositionInQuad,
  getRandomInt,
  getRandomWeightedValue,
} from '../utils';
import { System } from 'detect-collisions';
import { DynamicSkyObject } from '@modules/DynamicSkyObject';
import { OccludingObject } from '@modules/OccludingObject';

const spawnObject = (
  objects: DynamicSkyObject[],
  system: System,
  timestamp: number,
  aspectRatio: number = 1,
  position?: GamePosition
) => {
  const { asteroid, comet, supernova } = WEIGHTED_GENERATION as any;
  const type = getRandomWeightedValue({
    asteroid,
    comet,
    supernova,
  }) as SkyObjectType;
  const newObject = new DynamicSkyObject(
    type,
    timestamp,
    aspectRatio,
    position
  );
  objects.push(newObject);
  system.insert(newObject.physics);
};

/** method is dependent on game running at
 *  close to 60fps. 60 is divided by number of objects to generate
 *  per second, if number generated is equal to that then
 *  it should generate a new object
 */
const shouldSpawnObject = (frequency: number): boolean => {
  const target = 60 / frequency;

  return getRandomInt(1, target) === target;
};

export const spawnSkyObjects: GameSystem = (entities, { time, dispatch }) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { aspectRatio, stage } = state;
  const { dynamicObjects } = skyObjects;

  if (stage === 'running') {
    if (
      dynamicObjects.length < MAX_DYNAMIC_OBJECTS &&
      shouldSpawnObject(OBJECTS_PER_SECOND)
    ) {
      spawnObject(dynamicObjects, world.system, current, aspectRatio);
      dispatch({ type: 'spawnedObject' });
    }
  }

  return entities;
};

const prepareExpiringObjects = (
  object: DynamicSkyObject,
  currentTime: number
) => {
  if (!object.isExpiringSoon) {
    object.isExpiringSoon = object.expiration - FADE_TIME < currentTime;
    object.brightness = object.isExpiringSoon ? 0 : object.brightness;
  }

  return object;
};

export const cullSkyObjects: GameSystem = (entities, { time }) => {
  const { current } = time;
  const { skyObjects, world } = entities;

  const remainingObjects = skyObjects.dynamicObjects
    .map((object) => prepareExpiringObjects(object, current))
    .filter((object) => {
      if (!object.isExpiringSoon) return true;

      const isActive = object.expiration > current;
      if (!isActive) {
        world.system.remove(object.physics);
      }

      return isActive;
    });

  skyObjects.dynamicObjects = remainingObjects;

  return entities;
};

const spawnOcclusion = (
  type: SkyObjectType,
  objects: OccludingObject[],
  system: System,
  state: GameState
) => {
  const { aspectRatio, windSpeed } = state;

  const newOcclusion = new OccludingObject(type, aspectRatio, windSpeed);
  objects.push(newOcclusion);
  system.insert(newOcclusion.physics);
  state.nextSpawn[type] += getRandomInt(
    SPAWN_INTERVAL[type].min,
    SPAWN_INTERVAL[type].max
  );
};

export const spawnOccludingObjects: GameSystem = (
  entities,
  { dispatch, time }
) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { stage, nextSpawn, startTime } = state;
  const { occludingObjects } = skyObjects;

  if (stage === 'running') {
    Object.keys(nextSpawn).forEach((type) => {
      if (nextSpawn[type] < current - startTime) {
        spawnOcclusion(
          type as SkyObjectType,
          occludingObjects,
          world.occlusions,
          state
        );
        dispatch({ type: 'spawnedOcclusion' });
      }
    });
  }

  return entities;
};

export const moveOccludingObjects: GameSystem = (entities) => {
  const { skyObjects, state } = entities;
  const { stage } = state;
  const { occludingObjects } = skyObjects;

  if (stage !== 'menu' && occludingObjects.length > 0) {
    occludingObjects.forEach((object) => {
      const { x: deltaX, y: deltaY } = object.delta;
      const { x, y } = object.physics;
      object.physics.setPosition(x + deltaX, y + deltaY);
    });
  }

  return entities;
};

export const cullOccludingObjects: GameSystem = (entities) => {
  const { skyObjects, world } = entities;
  const { occlusions } = world;
  const { occludingObjects } = skyObjects;

  if (occludingObjects.length > 0) {
    const remainingObjects = occludingObjects.filter((object) => {
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

      occlusions.remove(object.physics);
      return true;
    });

    return {
      ...entities,
      skyObjects: { ...skyObjects, occludingObjects: remainingObjects },
    };
  }

  return entities;
};
