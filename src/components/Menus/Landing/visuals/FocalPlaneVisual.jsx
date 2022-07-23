import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import FocalPlane from '@components/svg/FocalPlane';
import NightSkyVisual from '@components/Menus/Landing/visuals/NightSkyVisual';
import moonImg from '@assets/image/moon.png';

const fade = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`;

const StyledFocalPlane = styled(FocalPlane)`
  opacity: 0;
  animation: ${fade} 2s;
  animation-delay: 3600ms;
  animation-fill-mode: forwards;
  position: relative;
  height: 100%;
  z-index: 2;
`;

const AnimatedMoonContainer = styled.div`
  position: absolute;
  height: 11rem;
  width: 11rem;
  display: flex;
  align-items: center;
`;

const animationDelays = () => {
  let delays = '';

  for (let i = 1; i < 8; i++) {
    delays += `&:nth-child(${i}){
      animation-delay: ${200 + 200 * i}ms
    }`;
  }

  return css`
    ${delays}
  `;
};

const AnimatedMoon = styled.img.attrs(() => ({ src: moonImg }))`
  max-width: ${(1 / 7) * 100}%;

  &:not(:first-child) {
    opacity: 0;
    animation: ${fade} 2s;
    animation-fill-mode: forwards;
  }

  ${animationDelays()}
`;

const FocalPlaneVisual = () => (
  <NightSkyVisual>
    <AnimatedMoonContainer>
      <AnimatedMoon />
      <AnimatedMoon />
      <AnimatedMoon />
      <AnimatedMoon />
      <AnimatedMoon />
      <AnimatedMoon />
      <AnimatedMoon />
    </AnimatedMoonContainer>
    <StyledFocalPlane />
  </NightSkyVisual>
);

export default FocalPlaneVisual;
