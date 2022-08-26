import React from 'react';
import styled from 'styled-components';
import FocalPlane from '@components/svg/FocalPlane';
import IconComposer from '@components/svg/IconComposer';

const StyledFocalPlane = styled.svg.attrs(({ x, y, size }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
  },
  width: `${size}%`,
}))`
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
`;

const FocalPlaneContainer = ({ x, y, size, children }) => (
  <StyledFocalPlane {...{ x, y, size }}>
    <IconComposer icon="focalPlane"></IconComposer>
    {children}
  </StyledFocalPlane>
);

export default FocalPlaneContainer;
