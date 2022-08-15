import { EXPOSURE_TIME } from '@constants/index';
import { GameSystem } from '@shapes/index';
import {
  getDistanceBetweenPoints,
  getRelativePosition,
  round,
  sum,
} from '../utils';
import { detectCapture } from '@systems/collision';

/** onClick, while the game has started but not end,
 *  get the click position and convert it to relative
 *  percentage then fire 'targetSet'
 */
const setCameraTarget: GameSystem = (entities, { input, dispatch }) => {
  const mouseDown = input.find((x) => x.name === 'onClick');
  const { state } = entities;
  const { stage } = state;

  if (mouseDown && stage === 'running') {
    const { payload } = mouseDown;
    const { pageX: x, pageY: y } = payload;
    const { state } = entities;
    const { boundingRect } = state;
    const nextPosition = getRelativePosition(x, y, boundingRect);

    dispatch({ type: 'targetSet', payload: nextPosition });
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
    const { payload: nextPosition } = event;
    const { aspectRatio } = state;
    const { physics, exposureRemaining, maxMove } = camera;
    const { x: currentX, y: currentY } = physics;
    const distance = getDistanceBetweenPoints(
      { x: currentX, y: currentY },
      nextPosition,
      aspectRatio
    );
    const steps = Math.ceil(distance / maxMove);
    const xDelta = round((nextPosition.x - currentX) / steps);
    const yDelta = round((nextPosition.y - currentY) / steps);

    if (!exposureRemaining) {
      dispatch({ type: 'cameraMoving' });
    }
    return {
      ...entities,
      camera: {
        ...camera,
        delta: { x: xDelta, y: yDelta },
        steps,
        nextPosition,
      },
    };
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
  const { stage } = state;

  if (event && stage === 'running') {
    const { camera } = entities;
    const { delta, physics, steps } = camera;
    const { x, y } = physics;
    const { x: deltaX, y: deltaY } = delta;

    if (steps > 0) {
      const newX = steps === 1 ? round(x + deltaX) : x + deltaX;
      const newY = steps === 1 ? round(y + deltaY) : y + deltaY;
      physics.setPosition(newX, newY);
      dispatch({ type: 'cameraMoving' });
      return {
        ...entities,
        camera: { ...camera, steps: steps - 1 },
      };
    } else {
      const { current: exposureStartTime } = time;
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
  const { camera, state, score } = entities;
  const { stage } = state;

  if (event && stage === 'running') {
    const { payload } = event;
    const { isFirstExposure } = payload;
    const { current } = time;
    const { exposureStartTime } = camera;
    const { physics, exposures } = camera;
    const { x, y } = physics;
    const exposureElapsed = current - exposureStartTime;

    if (isFirstExposure) {
      state.lastScore = sum(Object.values(score));
      exposures.push({ x, y });
    }

    detectCapture(entities, dispatch);

    if (exposureElapsed < EXPOSURE_TIME) {
      camera.exposureRemaining = EXPOSURE_TIME - exposureElapsed;
      dispatch({ type: 'cameraExposing', payload: { isFirstExposure: false } });
    } else {
      camera.exposureRemaining = null;
      camera.exposureStartTime = null;
      dispatch({
        type: 'cameraExposureEnd',
        payload: {
          failedCapture: sum(Object.values(score)) === state.lastScore,
        },
      });
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
    const { steps } = camera;

    if (steps > 0) {
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
