import React, { useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import Exposure from '@components/svg/Exposure';
import CameraTarget from '@components/Camera/Target';
import FocalPlaneContainer from '@components/Camera/FocalPlaneContainer';
import { fullScreenAbsolute } from '@styles/mixins/appearance';

const CameraContainer = styled.div`
  ${fullScreenAbsolute}
  user-select: none;
  z-index: ${zStack.camera};
`;

const ExposureText = styled.text.attrs(({ width, height, charSize }) => ({
  dominantBaseline: 'middle',
  textAnchor: 'middle',
  textLength: '80%',
  style: {
    fontSize: width / charSize || '1rem',
  },
}))`
  fill: var(--neutral10);
  font-weight: bold;
  text-shadow: 2px 2px 0 var(--neutral90);
`;

const CameraRenderer = ({
  nextPosition,
  exposures,
  exposureRemaining,
  physics,
  showEndgame,
  size,
}) => {
  const { ref, width, height } = useResizeObserver();
  const { x, y } = physics;
  const captureMessage = 'Capturing';
  const charSize = captureMessage.length / 2;

  return (
    <CameraContainer>
      {exposures &&
        exposures.map((exposure, i) => (
          <Exposure
            key={`expo-${i}-${exposure.x}-${exposure.y}`}
            {...{ x: exposure.x, y: exposure.y, size, $pause: showEndgame }}
          />
        ))}
      <FocalPlaneContainer {...{ x, y, size }}>
        <ExposureText
          x="50%"
          y="50%"
          ref={ref}
          visibility={exposureRemaining ? 'visible' : 'hidden'}
          {...{ width, height, charSize }}
        >
          {captureMessage}
        </ExposureText>
      </FocalPlaneContainer>
      {nextPosition && (
        <CameraTarget {...{ x: nextPosition.x, y: nextPosition.y, size }} />
      )}
    </CameraContainer>
  );
};

export default CameraRenderer;
