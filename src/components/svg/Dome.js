import React from 'react';
import styled from 'styled-components';
import DomeSVG from '@assets/svg/dome.svg';
import { zStack } from '@styles/globalStyle';

/**
 * this SVG is served from an img so that
 * useResizeObserver can properly set a ref
 * on it
 */
const Dome = styled.img.attrs(() => ({
  src: DomeSVG,
}))`
  height: 80%;
  position: absolute;
  z-index: ${zStack.hud};
  user-select: none;
`;

export default Dome;
