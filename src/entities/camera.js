import React from "react";
import CameraRenderer from "@components/Camera";
import { Polygon } from "detect-collisions";
import { FocalPlaneBounding } from "@constants/objects/boundings/FocalPlaneBounding";
import { getScaledObjectSize, scaleByAspectRatio } from "../utils";
import cameraConfig from "@constants/objects/camera";

export default (aspectRatio) => {
  const size = getScaledObjectSize(cameraConfig.size, aspectRatio);
  const showEndgame = false;
  const nextPosition = null;
  const delta = { x: null, y: null };
  const maxMove = scaleByAspectRatio(
    aspectRatio,
    cameraConfig.speed.target,
    cameraConfig.speed.min,
    cameraConfig.speed.max
  );
  const steps = 0;
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const physics = new Polygon({ x: 50, y: 50 }, FocalPlaneBounding, {
    center: true,
    isTrigger: true,
  });

  physics.setScale(size, size * aspectRatio);

  const paused = false;

  const properties = {
    showEndgame,
    nextPosition,
    delta,
    steps,
    maxMove,
    exposures,
    exposureStartTime,
    exposureRemaining,
    physics,
    size,
    paused,
  };

  return {
    ...properties,
    renderer: <CameraRenderer {...properties} />,
  };
};
