import { MAX_CAMERA_MOVE, EXPOSURE_TIME } from '@constants/index';
import { CameraPosition } from '@shapes/camera';
import { GameSystem } from '@shapes/system';
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
    const { currentPosition } = camera;
    const { boundingRect } = state;
    const nextPosition = getRelativePosition(x, y, boundingRect);

    if (getDistanceBetweenPoints(currentPosition, nextPosition) > 0) {
      dispatch({ type: 'targetSet' });
      return { ...entities, camera: { ...camera, nextPosition } };
    }
  }

  return entities;
};

/** onTargetSet, calculate the distance between the
 *  current position and the next position. Then calculate
 *  the number of steps to take based on max movement per tick
 *  and then create a path of CameraPositions and if the camera
 *  is not currently exposing, fire 'cameraMoving'
 */
const onTargetSet = (entities, { events, dispatch }) => {
  const event = events.find((e) => e.type === 'targetSet');

  if (event) {
    const { camera } = entities;
    const { currentPosition, nextPosition, exposureRemaining } = camera;
    const distance = getDistanceBetweenPoints(currentPosition, nextPosition);
    const steps = Math.ceil(distance / MAX_CAMERA_MOVE);
    const xStepDistance = (nextPosition.x - currentPosition.x) / steps;
    const yStepDistance = (nextPosition.y - currentPosition.y) / steps;

    const path: CameraPosition[] = [];

    for (let i = 1; i < steps; i++) {
      const movementX = xStepDistance * i;
      const movementY = yStepDistance * i;
      path.push({
        x: currentPosition.x + movementX,
        y: currentPosition.y + movementY,
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
const onCameraMoving = (entities, { events, dispatch, time }) => {
  const event = events.find((e) => e.type === 'cameraMoving');

  if (event) {
    const { camera } = entities;
    const { path } = camera;

    if (path.length > 0) {
      const nextStep = path.shift();
      dispatch({ type: 'cameraMoving' });
      return {
        ...entities,
        camera: { ...camera, currentPosition: nextStep, path },
      };
    } else {
      const { nextPosition } = camera;
      const { current: exposureStartTime } = time;
      dispatch({ type: 'cameraExposing' });
      return {
        ...entities,
        camera: {
          ...camera,
          exposureStartTime,
          exposureRemaining: EXPOSURE_TIME,
          currentPosition: nextPosition,
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
const onCameraExposing = (entities, { events, time, dispatch }) => {
  const event = events.find((e) => e.type === 'cameraExposing');

  if (event) {
    const { current } = time;
    const { camera } = entities;
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
      const { score } = entities;
      const { asteroid, comet, galaxy, star, supernova } = score;
      const newScore = {
        ...score,
        asteroid: asteroid + 1,
        comet: comet + 1,
        galaxy: galaxy + 1,
        star: star + 1,
        supernova: supernova + 1,
      };

      dispatch({ type: 'cameraExposureEnd', payload: newScore });
      return {
        ...entities,
        camera: {
          ...camera,
          exposureRemaining: null,
          exposureStartTime: null,
        },
        score: newScore,
      };
    }
  }

  return entities;
};

/** onCameraExposureEnd, add an exposure to the array of exposures
 *  at the current camera position. If a target was queued during
 *  exposure then fire 'cameraMoving' to restart movement.
 */
const onCameraExposureEnd = (entities, { events, dispatch }) => {
  const event = events.find((e) => e.type === 'cameraExposureEnd');

  if (event) {
    const { camera } = entities;

    const { exposures, currentPosition, path } = camera;

    exposures.push(currentPosition);

    if (path.length > 0) {
      dispatch({ type: 'cameraMoving' });
    }

    return {
      ...entities,
      camera: { ...camera, exposures },
    };
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
