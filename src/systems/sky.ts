import { GameSystem, GameState, SkyObjectType } from "@shapes/index";
import {
  FADE_TIME,
  MAX_DYNAMIC_OBJECTS,
  MAX_OCCLUDING_OBJECTS,
  MAX_TIMED_OBJECTS,
  SPAWN_INTERVAL,
  WEIGHTS_SPAWN,
} from "@constants/index";
import {
  getRandomInt,
  getRandomWeightedValue,
  timeFromTimerStart,
} from "../utils";
import { System } from "detect-collisions";
import { TimedSkyObject } from "@modules/TimedSkyObject";
import { DynamicObject } from "@modules/DynamicObject";

const spawnObject = (
  type: SkyObjectType,
  objects: Array<TimedSkyObject | DynamicObject>,
  system: System,
  state: GameState,
  group: string,
  timestamp: number
) => {
  const rateLimit = {
    cloud: MAX_OCCLUDING_OBJECTS,
    airplane: MAX_OCCLUDING_OBJECTS,
    asteroid: MAX_DYNAMIC_OBJECTS,
    comet: MAX_DYNAMIC_OBJECTS,
    supernova: MAX_TIMED_OBJECTS,
  };

  if (objects.length < rateLimit[type]) {
    const { aspectRatio } = state;

    let newObject =
      type === "supernova"
        ? new TimedSkyObject(type, timestamp, aspectRatio)
        : new DynamicObject(type, aspectRatio);
    objects.push(newObject);
    system.insert(newObject.physics);

    state.nextSpawn[group] += getRandomInt(
      SPAWN_INTERVAL[group].min,
      SPAWN_INTERVAL[group].max
    );
  }
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

const cullSkyObjects: GameSystem = (entities, { time }) => {
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

const spawnObjects: GameSystem = (entities, { dispatch, time }) => {
  const { current } = time;
  const { skyObjects, world, state } = entities;
  const { stage, nextSpawn } = state;
  const { system, occlusions } = world;
  const { occludingObjects, timedObjects, movingObjects } = skyObjects;

  const objectTypes = {
    cloud: "occlusion",
    airplane: "occlusion",
    supernova: "timedObject",
    asteroid: "dynamicObject",
    comet: "dynamicObject",
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

  const event = {
    occlusion: "spawnedOcclusion",
    timedObject: "spawnedObject",
    dynamicObject: "spawnedObject",
  };

  if (stage === "running") {
    Object.keys(nextSpawn).forEach((group) => {
      if (nextSpawn[group] < timeFromTimerStart(current, state)) {
        const weights = WEIGHTS_SPAWN[group];
        const object = getRandomWeightedValue(weights) as SkyObjectType;
        const objectType = objectTypes[object];
        spawnObject(
          object,
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

export default [spawnObjects, cullSkyObjects];
