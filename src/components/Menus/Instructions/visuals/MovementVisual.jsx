import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Styled from "@components/Camera/styles";
import FocalPlane from "@components/svg/FocalPlane";
import NightSkyVisual from "./NightSkyVisual";

const StyledFocalPlane = styled(FocalPlane).attrs(({ x, y }) => ({
  style: { left: `${x}%`, top: `${y}%` },
}))`
  position: absolute;
  transform: translate(-50%, -50%);
  transition: left 2s;
  transition-delay: 1s;
  height: 11rem;
`;

const MovementVisual = () => {
  const [targetPos, setTarget] = useState(null);
  const [cameraPos, setCamera] = useState(25);

  useEffect(() => {
    const newTarget = targetPos ? (targetPos === 75 ? 25 : 75) : 75;

    setTimeout(() => {
      setTarget(newTarget), setCamera(newTarget);
    }, 3500);
  }, [cameraPos]);

  return (
    <NightSkyVisual>
      <StyledFocalPlane x={cameraPos} y={50} />
      {targetPos && <Styled.CameraTarget x={targetPos} y={50} size={30} />}
    </NightSkyVisual>
  );
};

export default MovementVisual;
