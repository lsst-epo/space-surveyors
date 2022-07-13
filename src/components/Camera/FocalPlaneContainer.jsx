import React from 'react';
import useFitText from 'use-fit-text';
import styled from 'styled-components';
import { CAMERA_SIZE } from '@constants/';
import FocalPlane from '@components/svg/FocalPlane';

const ExposureContainer = styled.div`
  position: absolute;
  color: var(--offWhite);
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  text-shadow: #000 3px 2px 0;
  pointer-events: none;
`;

const StyledFocalPlaneContainer = styled.div.attrs(({ x, y, size }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
  },
}))`
  display: flex;
  font-size: 4em;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
`;

const FocalPlaneContainer = ({ x, y, children }) => {
  const size = CAMERA_SIZE;
  const { fontSize, ref } = useFitText({ minFontSize: 1, maxFontSize: 300 });
  return (
    <StyledFocalPlaneContainer {...{ x, y, size }}>
      {children && (
        <ExposureContainer ref={ref} style={{ fontSize }}>
          {children}
        </ExposureContainer>
      )}
      <FocalPlane />
    </StyledFocalPlaneContainer>
  );
};

export default FocalPlaneContainer;
