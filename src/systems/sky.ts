import { GameSystem, GameState, SkyObjectType } from '@shapes/index';
import {
  FADE_TIME,
  MAX_TIMED_OBJECTS,
  SPAWN_INTERVAL,
  WEIGHTS_SPAWN,
} from '@constants/index';
import { getRandomInt, getRandomWeightedValue } from '../utils';
import { System } from 'detect-collisions';
import { TimedSkyObject } from '@modules/TimedSkyObject';
import { spawnDynamicObject } from '@systems/dynamicObjects';

const spawnObject = (
  type: SkyObjectType,
  objects: TimedSkyObject[],
  system: System,
  state: GameState,
  group: string,
  timestamp: number
) => {
  if (objects.length < MAX_TIMED_OBJECTS) {
    const { aspectRatio } = state;
    const newObject = new TimedSkyObject(type, timestamp, aspectRatio);
    objects.push(newObject);
    system.insert(newObject.physics);
  }

  state.nextSpawn[group] += getRandomInt(
    SPAWN_INTERVAL[group].min,
    SPAWN_INTERVAL[group].max
  );
};

const prepareExpiringObjects = (
  object: TimedSkyObject,
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

  const remainingObjects = skyObjects.timedObjects
    .map((object) => prepareExpiringObjects(object, current))
    .filter((object) => {
      if (!object.isExpiringSoon) return true;

      const isActive = object.expiration > current;
      if (!isActive) {
        world.system.remove(object.physics);
      }

      return isActive;
    });

  skyObjects.timedObjects = remainingObjects;

  return entities;
};

export const spawnObjects: GameSystem = (entities, { dispatch, time }) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { stage, nextSpawn, startTime } = state;
  const { system, occlusions } = world;
  const { occludingObjects, timedObjects, movingObjects } = skyObjects;

  const objectTypes = {
    cloud: 'occlusion',
    airplane: 'occlusion',
    supernova: 'timedObject',
    asteroid: 'dynamicObject',
    comet: 'dynamicObject',
  };

  const objects = {
    occlusion: occludingObjects,
    timedObject: timedObjects,
    dynamicObject: movingObjects,
  };

  const physics = {
    occlusion: occlusions,
    timedObject: system,
    dynamicObject: system,
  };

  const spawners = {
    occlusion: spawnDynamicObject,
    dynamicObject: spawnDynamicObject,
    timedObject: spawnObject,
  };

  const event = {
    occlusion: 'spawnedOcclusion',
    timedObject: 'spawnedObject',
    dynamicObject: 'spawnedObject',
  };

  if (stage === 'running') {
    Object.keys(nextSpawn).forEach((group) => {
      if (nextSpawn[group] < current - startTime) {
        const weights = WEIGHTS_SPAWN[group];
        const object = getRandomWeightedValue(weights) as SkyObjectType;
        const objectType = objectTypes[object];
        const spawner = spawners[objectType];
        spawner(
          object as SkyObjectType,
          objects[objectType],
          physics[objectType],
          state,
          group,
          current
        );
        dispatch({ type: event[objectType] });
      }
    });
  }

  return entities;
};
