import React from 'react';
import styled from 'styled-components';
import FocalPlaneSVG from '@assets/svg/focalPlane.svg';
import { CAMERA_SIZE } from '@constants/';

const size = CAMERA_SIZE;

const FocalPlane = styled.img.attrs(() => ({
  style: {
    width: size,
    height: size,
    src: FocalPlaneSVG,
  },
}))`
  pointer-events: none;
`;

export default FocalPlane;
