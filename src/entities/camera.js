import React from 'react';
import CameraRenderer from '@components/Camera';
import { Polygon } from 'detect-collisions';
import { FocalPlaneBounding } from '@constants/objects/boundings/FocalPlaneBounding';
import { getScaledObjectSize } from '@constants/index';
import { round } from '../utils';

export default (aspectRatio) => {
  const size = getScaledObjectSize('camera', aspectRatio);
  const showEndgame = false;
  const offset = round(size / 2);
  const nextPosition = null;
  const delta = { x: null, y: null };
  const steps = 0;
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const physics = new Polygon(
    { x: 50 - offset, y: 50 - offset },
    FocalPlaneBounding(size, size * aspectRatio),
    { center: true, isTrigger: true }
  );

  const properties = {
    showEndgame,
    nextPosition,
    delta,
    steps,
    exposures,
    exposureStartTime,
    exposureRemaining,
    physics,
    size,
  };

  return {
    ...properties,
    renderer: <CameraRenderer {...properties} />,
  };
};
