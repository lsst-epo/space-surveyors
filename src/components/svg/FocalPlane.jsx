import React from 'react';
import styled from 'styled-components';
import FocalPlaneSVG from '@assets/svg/focalPlane.svg';
import { CAMERA_SIZE } from '@constants/';

const StyledFocalPlane = styled.img`
  position: absolute;
`;

const ExposureContainer = styled.div`
  position: absolute;
  color: var(--offWhite);
  font-size: 4em;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

const FocalPlaneContainer = styled.div.attrs(({ x, y, offset }) => ({
  style: {
    left: `calc(${x}% - ${offset}px)`,
    top: `calc(${y}% - ${offset}px)`,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const FocalPlane = ({ x, y, children }) => {
  const size = CAMERA_SIZE;
  return (
    <FocalPlaneContainer offset={size / 2} {...{ x, y }}>
      {children && <ExposureContainer>{children}</ExposureContainer>}
      <img src={FocalPlaneSVG} width={size} height={size} />
    </FocalPlaneContainer>
  );
};

export default FocalPlane;
