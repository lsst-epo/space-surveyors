import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import Exposure from '@components/svg/Exposure';
import CameraTarget from '@components/Camera/Target';
import FocalPlaneContainer from '@components/Camera/FocalPlaneContainer';

const CameraContainer = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${zStack.camera};
`;

const CameraRenderer = ({
  nextPosition,
  exposures,
  exposureRemaining,
  physics,
}) => {
  const { x, y } = physics;

  return (
    <CameraContainer>
      <FocalPlaneContainer {...{ x, y }}>
        {exposureRemaining && (
          <span>{Math.floor(exposureRemaining / 1000)}</span>
        )}
      </FocalPlaneContainer>
      {nextPosition && (
        <CameraTarget {...{ x: nextPosition.x, y: nextPosition.y }} />
      )}
      {exposures &&
        exposures.map((exposure, i) => (
          <Exposure
            key={`expo-${i}-${exposure.x}-${exposure.y}`}
            {...{ x: exposure.x, y: exposure.y }}
          />
        ))}
    </CameraContainer>
  );
};

export default CameraRenderer;
