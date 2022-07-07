import React from 'react';
import CameraRenderer from '@components/Camera';
import { Polygon } from 'detect-collisions';
import { FocalPlaneBounding } from './boundings/FocalPlaneBounding';
import { CAMERA_SIZE } from '@constants/';

export default () => {
  const nextPosition = null;
  const path = [];
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const physics = new Polygon(
    { x: 50, y: 50 },
    FocalPlaneBounding(CAMERA_SIZE)
  );

  physics.center();

  const properties = {
    nextPosition,
    path,
    exposures,
    exposureStartTime,
    exposureRemaining,
    physics,
  };

  return {
    ...properties,
    renderer: <CameraRenderer {...properties} />,
  };
};
