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

const StyledFocalPlaneContainer = styled.div.attrs(({ x, y, offset }) => ({
  style: {
    left: `calc(${x}% - ${offset}px)`,
    top: `calc(${y}% - ${offset}px)`,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const FocalPlaneContainer = ({ x, y, children }) => {
  const size = CAMERA_SIZE;
  return (
    <StyledFocalPlaneContainer offset={size / 2} {...{ x, y, size }}>
      {children && <ExposureContainer>{children}</ExposureContainer>}
      <FocalPlane />
    </StyledFocalPlaneContainer>
  );
};

export default FocalPlaneContainer;
