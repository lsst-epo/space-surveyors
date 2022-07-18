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
  showEndgame,
}) => {
  const renderOccludingObjects = (object) => {
    const { width } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];

    return (
      <Object
        key={`${object.type}-${x}-${y}`}
        {...{ x, y, width: `${width}%` }}
      />
    );
  };
  const renderSkyObjects = (object) => {
    const { width, brightness, captured, angle } = object;
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
          angle,
        }}
      />
    );
  };

  return (
    <NightSkyContainer>
      {!showEndgame && staticObjects.map(renderSkyObjects)}
      {!showEndgame && dynamicObjects.map(renderSkyObjects)}
      {!showEndgame && occludingObjects.map(renderSkyObjects)}
      {showEndgame && capturedObjects.map(renderSkyObjects)}
    </NightSkyContainer>
  );
};

export default NightSkyRenderer;
