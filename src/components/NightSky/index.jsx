import React from 'react';
import styled from 'styled-components';
import Objects from '@components/NightSky/objects';
import { zStack } from '@styles/globalStyle';

const NightSkyContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zStack.objects};
`;

const NightSkyRenderer = ({
  staticObjects,
  dynamicObjects,
  occludingObjects,
  capturedObjects,
  fade,
  showSunrise,
}) => {
  const renderOccludingObjects = (object, i) => {
    const { width, angle } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];

    return (
      <Object
        key={`${object.type}-${width}-${i}`}
        {...{
          x,
          y,
          angle,
          width: `${width}%`,
          variant: showSunrise ? 'day' : 'night',
        }}
      />
    );
  };
  const renderSkyObjects = (object) => {
    const { width, brightness, captured, fadeIn } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];

    return (
      <Object
        key={`${object.type}-${x}-${y}`}
        {...{
          brightness,
          $captured: captured,
          x,
          y,
          width: `${width}%`,
          ...(fadeIn ? { $fadeIn: fade } : { $fadeOut: fade }),
        }}
      />
    );
  };

  return (
    <NightSkyContainer>
      {staticObjects.map(renderSkyObjects)}
      {dynamicObjects.map(renderSkyObjects)}
      {fade && capturedObjects.map(renderSkyObjects)}
      {occludingObjects.map(renderOccludingObjects)}
    </NightSkyContainer>
  );
};

export default NightSkyRenderer;
