import React from 'react';
import CameraRenderer from '@components/Camera';

export default () => {
  const currentPosition = { x: 50, y: 50 };
  const nextPosition = null;
  const path = [];
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const isMoving = false;

  const properties = {
    currentPosition,
    nextPosition,
    path,
    exposures,
    exposureStartTime,
    exposureRemaining,
    isMoving,
  };

  return {
    ...properties,
    renderer: <CameraRenderer {...properties} />,
  };
};
