import React from 'react';
import styled from 'styled-components';
import { CAMERA_SIZE } from '@constants/';
import FocalPlane from '@components/svg/FocalPlane';

const ExposureContainer = styled.div`
  position: absolute;
  color: var(--offWhite);
  font-size: 4em;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

const StyledFocalPlaneContainer = styled.div.attrs(({ x, y }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  transform: translate(-50%, -50%);
`;

const FocalPlaneContainer = ({ x, y, children }) => {
  const size = CAMERA_SIZE;
  return (
    <StyledFocalPlaneContainer {...{ x, y, size }}>
      {children && <ExposureContainer>{children}</ExposureContainer>}
      <FocalPlane />
    </StyledFocalPlaneContainer>
  );
};

export default FocalPlaneContainer;
