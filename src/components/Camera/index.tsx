import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import { CameraRendererProps } from '@shapes/camera';
import FocalPlane from '@components/svg/FocalPlane';
import Exposure from '@components/svg/Exposure';
import CameraTarget from '@components/Camera/Target';

const CameraContainer = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${zStack.camera};
`;

const CameraRenderer = ({
  currentPosition,
  nextPosition,
  exposures,
  exposureRemaining,
}: CameraRendererProps) => {
  const { x, y } = currentPosition;

  return (
    <CameraContainer>
      <FocalPlane {...{ x, y }}>
        {exposureRemaining && (
          <span>{Math.floor(exposureRemaining / 1000)}</span>
        )}
      </FocalPlane>
      {nextPosition && <CameraTarget x={nextPosition.x} y={nextPosition.y} />}
      {exposures &&
        exposures.map((exposure, i) => (
          <Exposure
            key={`expo-${i}-${exposure.x}-${exposure.y}`}
            x={exposure.x}
            y={exposure.y}
          />
        ))}
    </CameraContainer>
  );
};

export default CameraRenderer;
