import React from "react";
import CameraRenderer from "@components/Camera";
import { Polygon } from "detect-collisions";
import { FocalPlaneBounding } from "@constants/objects/boundings/FocalPlaneBounding";
import {
  CAMERA_MOVE,
  MAX_CAMERA_MOVE,
  MIN_CAMERA_MOVE,
} from "@constants/index";
import { round, getScaledObjectSize, scaleByAspectRatio } from "../utils";

const cameraSizeConfig = {
  min: 15,
  target: 25,
  max: 30,
};

export default (aspectRatio) => {
  const size = getScaledObjectSize(cameraSizeConfig, aspectRatio);
  const showEndgame = false;
  const offset = round(size / 2);
  const nextPosition = null;
  const delta = { x: null, y: null };
  const maxMove = scaleByAspectRatio(
    aspectRatio,
    CAMERA_MOVE,
    MIN_CAMERA_MOVE,
    MAX_CAMERA_MOVE
  );
  const steps = 0;
  const exposures = [];
  const exposureStartTime = null;
  const exposureRemaining = null;
  const physics = new Polygon(
    { x: 50 - offset, y: 50 - offset },
    FocalPlaneBounding,
    { center: true, isTrigger: true }
  );

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
