import { GameSystem, GamePosition } from '@shapes/index';
import {
  FADE_TIME,
  MAX_SKY_OBJECTS,
  OBJECTS_PER_SECOND,
  WEIGHTED_GENERATION,
} from '@constants/index';
import { getRandomInt, getRandomWeightedValue } from '../utils';
import { SkyObject } from '@entities/skyObjects/skyObject';
import { System } from 'detect-collisions';

const addObject = (
  objects: SkyObject[],
  system: System,
  timestamp: number,
  aspectRatio: number = 1,
  position?: GamePosition
) => {
  const type = getRandomWeightedValue(WEIGHTED_GENERATION);
  const newObject = new SkyObject(type, timestamp, aspectRatio, position);
  objects.push(newObject);
  system.insert(newObject.physics);
};

/** method is dependent on game running at
 *  close to 60fps. 60 is divided by number of objects to generate
 *  per second, if number generated is equal to that then
 *  it should generate a new object
 */
const shouldAddObject = (): boolean => {
  const target = 60 / OBJECTS_PER_SECOND;

  return getRandomInt(1, target) === target;
};

export const addSkyObjects: GameSystem = (entities, { time }) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { aspectRatio, startTime, endTime } = state;
  const { objects } = skyObjects;

  if (startTime && !endTime) {
    if (objects.length < MAX_SKY_OBJECTS && shouldAddObject()) {
      addObject(objects, world.system, current, aspectRatio);
    }
  }

  return entities;
};

const prepareExpiringObjects = (object: SkyObject, currentTime: number) => {
  if (!object.isExpiringSoon) {
    object.isExpiringSoon = object.expiration - FADE_TIME < currentTime;
    object.brightness = object.isExpiringSoon ? 0 : object.brightness;
  }

  return object;
};

export const cullSkyObjects: GameSystem = (entities, { time }) => {
  const { current } = time;
  const { skyObjects, world } = entities;

  const remainingObjects = skyObjects.objects
    .map((object) => prepareExpiringObjects(object, current))
    .filter((object) => {
      if (!object.isExpiringSoon) return true;

      const isActive = object.expiration > current;
      if (!isActive) {
        world.system.remove(object.physics);
      }

      return isActive;
    });

  skyObjects.objects = remainingObjects;

  return entities;
};
