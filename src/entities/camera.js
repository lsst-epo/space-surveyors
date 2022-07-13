import React from 'react';
import CameraRenderer from '@components/Camera';
import { Polygon } from 'detect-collisions';
import { FocalPlaneBounding } from './boundings/FocalPlaneBounding';
import { CAMERA_SIZE } from '@constants/index';

export default (aspectRatio) => {
  const offset = CAMERA_SIZE / 2;
  const nextPosition = null;
  const path = [];
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const physics = new Polygon(
    { x: 50 - offset, y: 50 - offset },
    FocalPlaneBounding(CAMERA_SIZE, CAMERA_SIZE * aspectRatio),
    { center: true, isTrigger: true }
  );

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
