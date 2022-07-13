import { MAX_CAMERA_MOVE, EXPOSURE_TIME, MIN_OVERLAP } from '@constants/index';
import {
  GamePosition,
  GameEntities,
  GameEventDispatch,
  GameSystem,
} from '@shapes/index';
import { getDistanceBetweenPoints, getRelativePosition } from '../utils';

/** onClick, while the game has started but not end,
 *  get the click position and convert it to relative
 *  percentage then fire 'targetSet'
 */
const setCameraTarget: GameSystem = (entities, { input, dispatch }) => {
  const mouseDown = input.find((x) => x.name === 'onClick');
  const { state } = entities;
  const { startTime, endTime } = state;

  if (mouseDown && startTime && !endTime) {
    const { payload } = mouseDown;
    const { pageX: x, pageY: y } = payload;
    const { camera, state } = entities;
    const { physics } = camera;
    const { boundingRect } = state;
    const nextPosition = getRelativePosition(x, y, boundingRect);

    if (
      getDistanceBetweenPoints({ x: physics.x, y: physics.y }, nextPosition) > 0
    ) {
      dispatch({ type: 'targetSet' });
      return { ...entities, camera: { ...camera, nextPosition } };
    }
  }

  return entities;
};

/** onTargetSet, calculate the distance between the
 *  current position and the next position. Then calculate
 *  the number of steps to take based on max movement per tick
 *  and then create a path of GamePositions and if the camera
 *  is not currently exposing, fire 'cameraMoving'
 */
const onTargetSet: GameSystem = (entities, { events, dispatch }) => {
  const event = events.find((e) => e.type === 'targetSet');

  if (event) {
    const { camera } = entities;
    const { physics, nextPosition, exposureRemaining } = camera;
    const { x: currentX, y: currentY } = physics;
    const distance = getDistanceBetweenPoints(
      { x: currentX, y: currentY },
      nextPosition
    );
    const steps = Math.ceil(distance / MAX_CAMERA_MOVE);
    const xStepDistance = (nextPosition.x - currentX) / steps;
    const yStepDistance = (nextPosition.y - currentY) / steps;

    const path: GamePosition[] = [];

    for (let i = 1; i < steps; i++) {
      const movementX = xStepDistance * i;
      const movementY = yStepDistance * i;
      path.push({
        x: currentX + movementX,
        y: currentY + movementY,
      });
    }

    path.push(nextPosition);

    if (!exposureRemaining) {
      dispatch({ type: 'cameraMoving' });
    }
    return { ...entities, camera: { ...camera, path } };
  }

  return entities;
};

/** onCameraMoving, check if there are future positions in the
 *  path. Pull the first one out and move to that position then
 *  fire 'cameraMoving'. If not future positions remaining then
 *  fire 'cameraExposing' and save the exposure start time.
 */
const onCameraMoving: GameSystem = (entities, { events, dispatch, time }) => {
  const event = events.find((e) => e.type === 'cameraMoving');
  const { state } = entities;
  const { startTime, endTime } = state;

  if (event && startTime && !endTime) {
    const { camera } = entities;
    const { path } = camera;

    if (path.length > 0) {
      const nextStep = path.shift();
      camera.physics.setPosition(nextStep.x, nextStep.y);
      dispatch({ type: 'cameraMoving' });
      return {
        ...entities,
        camera: { ...camera, path },
      };
    } else {
      const { nextPosition } = camera;
      const { current: exposureStartTime } = time;
      camera.physics.setPosition(nextPosition.x, nextPosition.y);
      dispatch({ type: 'cameraExposing' });
      return {
        ...entities,
        camera: {
          ...camera,
          exposureStartTime,
          exposureRemaining: EXPOSURE_TIME,
          nextPosition: null,
        },
      };
    }
  }

  return entities;
};

/** onCameraExposing, calculate if total exposure time has lapsed.
 *  If exposure time has not lapsed then fire 'cameraExposing' to
 *  continue exposure. If exposure time has lapsed, remove the
 *  exposure start time and time remaining and fire 'cameraExposureEnd
 */
const onCameraExposing: GameSystem = (entities, { events, time, dispatch }) => {
  const event = events.find((e) => e.type === 'cameraExposing');
  const timeEnd = events.find((e) => e.type === 'timeEnd');
  const { camera } = entities;

  if (event && !timeEnd) {
    const { current } = time;
    const { exposureStartTime } = camera;
    const exposureElapsed = current - exposureStartTime;

    if (exposureElapsed < EXPOSURE_TIME) {
      dispatch({ type: 'cameraExposing' });

      return {
        ...entities,
        camera: {
          ...camera,
          exposureRemaining: EXPOSURE_TIME - exposureElapsed,
        },
      };
    } else {
      dispatch({ type: 'cameraExposureEnd' });
      return {
        ...entities,
        camera: {
          ...camera,
          exposureRemaining: null,
          exposureStartTime: null,
        },
      };
    }
  }

  return entities;
};

/**
 * check to see if the colliding object overlaps by
 * more than x% of it's width or height
 */
const checkOverlap = (response: SAT.Response): boolean => {
  if (response.bInA) return true;

  const { b: collider, overlapV } = response;
  const x = collider.maxX - collider.minX;
  const y = collider.maxY - collider.minY;
  const xOverlap = Math.abs(overlapV.x / x);
  const yOverlap = Math.abs(overlapV.y / y);

  return xOverlap >= MIN_OVERLAP || yOverlap >= MIN_OVERLAP;
};

/** detect if camera captured any objects by first doing potential
 *  collision checks on bounding boxes, then refining and doing a full
 *  collision check on all potentials, get the matching object in the
 *  game entities by location and increment the score by the type of
 *  object found.
 */
const detectCapture = (entities: GameEntities, dispatch: GameEventDispatch) => {
  const { world, camera, score } = entities;
  let isScoreUpdated = false;

  world.system.update();
  const potentials = world.system.getPotentials(camera.physics);

  potentials.forEach((body) => {
    if (world.system.checkCollision(camera.physics, body)) {
      const isDetected = checkOverlap(world.system.response);

      if (isDetected) {
        const { skyObjects } = entities;
        const { x, y } = body;

        const collider = skyObjects.objects.find(
          (object) => object.physics.x === x && object.physics.y === y
        );

        if (collider) {
          const capturedCollider = { ...collider };
          skyObjects.capturedObjects.push(capturedCollider);
          world.system.remove(collider.physics);
          collider.captured = true;
          score[collider.type]++;
          isScoreUpdated = true;
        }
      }
    }
  });

  if (isScoreUpdated) {
    dispatch({ type: 'scoreUpdate', payload: score });
  }
};

/** onCameraExposureEnd, add an exposure to the array of exposures
 *  at the current camera position. If a target was queued during
 *  exposure then fire 'cameraMoving' to restart movement.
 */
const onCameraExposureEnd: GameSystem = (entities, { events, dispatch }) => {
  const event = events.find((e) => e.type === 'cameraExposureEnd');

  if (event) {
    const { camera } = entities;

    const { exposures, physics, path } = camera;
    const { x, y } = physics;

    detectCapture(entities, dispatch);

    exposures.push({ x, y });

    if (path.length > 0) {
      dispatch({ type: 'cameraMoving' });
    }
  }

  return entities;
};

export {
  setCameraTarget,
  onTargetSet,
  onCameraMoving,
  onCameraExposing,
  onCameraExposureEnd,
};