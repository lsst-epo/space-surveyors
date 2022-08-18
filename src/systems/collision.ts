import { MIN_OVERLAP } from "@constants/index";
import { SkyObject } from "@modules/SkyObject";
import { GameEventDispatch, GameEntities } from "@shapes/index";
import { System, Body } from "detect-collisions";

/**
 * check to see if the colliding object overlaps by
 * more than x% of it's width or height
 */
const doesOverlap = (response: SAT.Response): boolean => {
  if (response.bInA) return true;

  const { b: collider, overlapV } = response;
  const x = collider.maxX - collider.minX;
  const y = collider.maxY - collider.minY;
  const xOverlap = Math.abs(overlapV.x / x);
  const yOverlap = Math.abs(overlapV.y / y);

  return xOverlap >= MIN_OVERLAP || yOverlap >= MIN_OVERLAP;
};

const isOccluded = (collider: Body, occlusions: System): boolean => {
  occlusions.insert(collider);
  const potentials = occlusions.getPotentials(collider);

  if (potentials.length > 0) {
    const collided: boolean = potentials.some((body: Body) =>
      occlusions.checkCollision(collider, body)
    );
    occlusions.remove(collider);

    return collided;
  } else {
    occlusions.remove(collider);
    return false;
  }
};

const handleCapturedObject = (collider: SkyObject, entities: GameEntities) => {
  const { skyObjects, world, score } = entities;
  const { system } = world;

  skyObjects.capturedObjects.push({ ...collider, fadeIn: true });
  system.remove(collider.physics);
  collider.captured = true;
  score[collider.type]++;
};

/** detect if camera captured any objects by first doing potential
 *  collision checks on bounding boxes, then refining and doing a full
 *  collision check on all potentials, get the matching object in the
 *  game entities by location and increment the score by the type of
 *  object found.
 */
export const detectCapture = (
  entities: GameEntities,
  dispatch: GameEventDispatch
) => {
  const { world, camera, score } = entities;
  const { system, occlusions } = world;
  let isScoreUpdated = false;

  const potentials = system.getPotentials(camera.physics);

  potentials.forEach((body) => {
    if (system.checkCollision(camera.physics, body)) {
      if (isOccluded(body, occlusions) || !doesOverlap(system.response)) return;

      const { skyObjects } = entities;
      const { staticObjects, timedObjects, movingObjects } = skyObjects;
      const { x, y } = body;

      const collider = [
        ...staticObjects,
        ...timedObjects,
        ...movingObjects,
      ].find((object) => object.physics.x === x && object.physics.y === y);

      if (collider) {
        handleCapturedObject(collider, entities);
        isScoreUpdated = true;
      }
    }
  });

  if (isScoreUpdated) {
    dispatch({ type: "scoreUpdate", payload: score });
  }
};
