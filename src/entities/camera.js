import React from 'react';
import CameraRenderer from '@components/Camera';
import { Polygon } from 'detect-collisions';
import { FocalPlaneBounding } from '@constants/objects/boundings/FocalPlaneBounding';
import { getScaledObjectSize } from '@constants/index';

export default (aspectRatio) => {
  const size = getScaledObjectSize('camera', aspectRatio);
  const showEndgame = false;
  const offset = size / 2;
  const nextPosition = null;
  const path = [];
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
    path,
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
