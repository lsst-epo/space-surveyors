import React, { useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';

const StyledDomeSVG = styled(DomeSVG)`
  height: 0;
  top: 0;
  lef
  position: absolute;
  z-index: ${zStack.hud};
  user-select: none;
`;

const DomeUpper = styled.div`
  position: absolute;
  right: 4px;
  height: 0;
  width: 100vw;

  ${({ $width, $height }) => `
    border-bottom: ${Math.round($height * 0.25)}px solid #313333;
    border-right: ${$width * 0.2}px solid transparent;
    
    &::after {
      content: '';
      height: 0;
      border-bottom: ${Math.round($height * 0.25)}px solid #6a6e6e;
      border-right: ${$width * 0.2}px solid transparent;
      position: absolute;
      right: -${$width * 0.2 + 4}px;
      z-index: -1;
      width: 100%;
    }`}
`;
const DomeLower = styled.div`
  position: absolute;
  bottom: 0;
  right: 4px;
  height: 0;
  width: 100vw;

  ${({ $width, $height }) => `
    border-top: ${Math.round($height * 0.75)}px solid var(--neutral95);
    border-right: ${$width * 0.4}px solid transparent;
    
    &::after {
      content: '';
      height: 0;
      border-top: ${Math.round($height * 0.75)}px solid #313333;
      border-right: ${$width * 0.4}px solid transparent;
      position: absolute;
      bottom: 0;
      right: -${$width * 0.4 + 4}px;
      z-index: -1;
      width: 100%;
    }`}
`;

const DomeOuter = styled.div`
  height: 100%;
  width: 10%;
  top: 0;
  position: absolute;
  z-index: ${zStack.hud};
  user-select: none;

  ${({ $left }) => ($left ? `transform: scaleX(-1); right: 0;` : `left: 0;`)}
`;

const Dome = ({ $left }) => {
  const ref = useRef(null);
  const { width, height } = useResizeObserver({ ref });

  return (
    <DomeOuter ref={ref} $left={$left}>
      <DomeUpper $width={width} $height={height} />
      <DomeLower $width={width} $height={height} />
    </DomeOuter>
  );
};

export default Dome;
