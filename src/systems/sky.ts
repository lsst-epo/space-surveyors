import { GameSystem, GameState, SkyObjectType } from '@shapes/index';
import {
  FADE_TIME,
  MAX_DYNAMIC_OBJECTS,
  MAX_OCCLUDING_OBJECTS,
  SPAWN_INTERVAL,
} from '@constants/index';
import { getRandomInt } from '../utils';
import { System } from 'detect-collisions';
import { DynamicSkyObject } from '@modules/DynamicSkyObject';
import { OccludingObject } from '@modules/OccludingObject';

const spawnObject = (
  type: SkyObjectType,
  objects: DynamicSkyObject[],
  system: System,
  state: GameState,
  timestamp: number
) => {
  if (objects.length < MAX_DYNAMIC_OBJECTS) {
    const { aspectRatio } = state;
    const newObject = new DynamicSkyObject(type, timestamp, aspectRatio);
    objects.push(newObject);
    system.insert(newObject.physics);
  }

  state.nextSpawn[type] += getRandomInt(
    SPAWN_INTERVAL[type].min,
    SPAWN_INTERVAL[type].max
  );
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
  if (objects.length < MAX_OCCLUDING_OBJECTS) {
    const { aspectRatio, windSpeed } = state;
    const newOcclusion = new OccludingObject(type, aspectRatio, windSpeed);
    objects.push(newOcclusion);
    system.insert(newOcclusion.physics);
  }

  state.nextSpawn[type] += getRandomInt(
    SPAWN_INTERVAL[type].min,
    SPAWN_INTERVAL[type].max
  );
};

export const spawnObjects: GameSystem = (entities, { dispatch, time }) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { stage, nextSpawn, startTime } = state;
  const { system, occlusions } = world;
  const { occludingObjects, dynamicObjects } = skyObjects;

  const objectTypes = {
    cloud: 'occlusion',
    airplane: 'occlusion',
    supernova: 'dynamicObject',
  };

  const objects = {
    occlusion: occludingObjects,
    dynamicObject: dynamicObjects,
  };

  const physics = {
    occlusion: occlusions,
    dynamicObject: system,
  };

  const spawners = {
    occlusion: spawnOcclusion,
    dynamicObject: spawnObject,
  };

  const event = {
    occlusion: 'spawnedOcclusion',
    dynamicObject: 'spawnedObject',
  };

  if (stage === 'running') {
    Object.keys(nextSpawn).forEach((object) => {
      if (nextSpawn[object] < current - startTime) {
        const objectType = objectTypes[object];
        const spawner = spawners[objectType];

        spawner(
          object as SkyObjectType,
          objects[objectType],
          physics[objectType],
          state,
          current
        );

        dispatch({ type: event[objectType] });
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
