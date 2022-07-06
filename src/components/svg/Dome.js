import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import DomeSVG from '@assets/svg/dome.svg';
import { zStack } from '@styles/globalStyle';

const Dome = styled(SVG).attrs(() => ({
  src: DomeSVG,
}))`
  height: 80%;
  position: absolute;
  z-index: ${zStack.hud};
  user-select: none;
  ${({ $left }) =>
    $left
      ? `transform: translateX(min(0vw,calc(-100% + 10vw))) scaleX(-1);`
      : `transform: translateX(max(calc(100vw - 100%),90vw))`}
`;

Dome.propTypes = {
  $left: PropTypes.bool,
};

export default Dome;
