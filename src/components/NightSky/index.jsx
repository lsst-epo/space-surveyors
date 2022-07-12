import React from 'react';
import styled from 'styled-components';
import Objects from '@components/NightSky/objects';
import { zStack } from '@styles/globalStyle';
import { fadeIn } from '@styles/keyframes';

const NightSkyContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zStack.objects};
`;

const NightSkyRenderer = ({ objects, capturedObjects, showEndgame }) => {
  const renderSkyObjects = (object) => {
    const { width, brightness, captured } = object;
    const { x, y } = object.physics;
    const Object = Objects[object.type];
    return (
      <Object
        key={`${object.type}-${x}-${y}`}
        {...{ brightness, captured, x, y, width: `${width}%` }}
      />
    );
  };

  return (
    <NightSkyContainer>
      {!showEndgame && objects && objects.map(renderSkyObjects)}
      {showEndgame && capturedObjects.map(renderSkyObjects)}
    </NightSkyContainer>
  );
};

export default NightSkyRenderer;
