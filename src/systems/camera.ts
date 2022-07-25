import { MAX_CAMERA_MOVE, EXPOSURE_TIME } from '@constants/index';
import { GamePosition, GameSystem } from '@shapes/index';
import { getDistanceBetweenPoints, getRelativePosition } from '../utils';
import { detectCapture } from '@systems/collision';

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
    const { boundingRect } = state;
    const nextPosition = getRelativePosition(x, y, boundingRect);

    dispatch({ type: 'targetSet' });
    return { ...entities, camera: { ...camera, nextPosition } };
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
    const { camera, state } = entities;
    const { aspectRatio } = state;
    const { physics, nextPosition, exposureRemaining } = camera;
    const { x: currentX, y: currentY } = physics;
    const distance = getDistanceBetweenPoints(
      { x: currentX, y: currentY },
      nextPosition,
      aspectRatio
    );
    const steps = Math.ceil(distance / MAX_CAMERA_MOVE);
    const xDelta = (nextPosition.x - currentX) / steps;
    const yDelta = (nextPosition.y - currentY) / steps;

    const path: GamePosition[] = [];

    for (let i = 1; i <= steps; i++) {
      const movementX = xDelta * i;
      const movementY = yDelta * i;
      path.push({
        x: currentX + movementX,
        y: currentY + movementY,
      });
    }

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
      dispatch({ type: 'cameraExposing', payload: { isFirstExposure: true } });
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
  const isTimeEnd = events.find((e) => e.type === 'timeEnd');
  const { camera } = entities;

  if (event && !isTimeEnd) {
    const { payload } = event;
    const { isFirstExposure } = payload;
    const { current } = time;
    const { exposureStartTime } = camera;
    const { physics, exposures } = camera;
    const { x, y } = physics;
    const exposureElapsed = current - exposureStartTime;

    if (isFirstExposure) {
      exposures.push({ x, y });
    }

    detectCapture(entities, dispatch);

    if (exposureElapsed < EXPOSURE_TIME) {
      dispatch({ type: 'cameraExposing', payload: { isFirstExposure: false } });

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

/** onCameraExposureEnd, add an exposure to the array of exposures
 *  at the current camera position. If a target was queued during
 *  exposure then fire 'cameraMoving' to restart movement.
 */
const onCameraExposureEnd: GameSystem = (entities, { events, dispatch }) => {
  const event = events.find((e) => e.type === 'cameraExposureEnd');

  if (event) {
    const { camera } = entities;
    const { path } = camera;

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
