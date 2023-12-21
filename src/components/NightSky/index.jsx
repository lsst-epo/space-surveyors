import React from "react";
import styled from "styled-components";
import Objects from "@components/NightSky/objects";
import { zStack } from "@styles/globalStyle";

const NightSkyContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zStack.objects};
  pointer-events: none;
`;

const NightSkyRenderer = ({
  staticObjects,
  timedObjects,
  occludingObjects,
  movingObjects,
  capturedObjects,
  fade,
  showSunrise,
}) => {
  const renderOccludingObjects = (object) => {
    const { width, angle, uuid } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];

    return (
      <Object
        key={uuid}
        {...{
          x,
          y,
          angle,
          width: `${width}%`,
          variant: showSunrise ? "day" : "night",
        }}
      />
    );
  };
  const renderSkyObjects = (object) => {
    const { width, brightness, captured, fadeIn, angle, uuid, color } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];

    return (
      <Object
        key={uuid}
        {...{
          brightness,
          $captured: captured,
          x,
          y,
          width: `${width}%`,
          angle,
          color,
          ...(fadeIn ? { $fadeIn: fade } : { $fadeOut: fade }),
        }}
      />
    );
  };

  return (
    <NightSkyContainer>
      {staticObjects.map(renderSkyObjects)}
      {timedObjects.map(renderSkyObjects)}
      {movingObjects.map(renderSkyObjects)}
      {fade && capturedObjects.map(renderSkyObjects)}
      {occludingObjects.map(renderOccludingObjects)}
    </NightSkyContainer>
  );
};

export default NightSkyRenderer;
