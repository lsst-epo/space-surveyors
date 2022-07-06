import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import DomeSVG from '@assets/svg/dome.svg';
import { zStack, BREAK_DESKTOP } from '@styles/globalStyle';

const Dome = styled(SVG).attrs(() => ({
  src: DomeSVG,
}))`
  height: 80%;
  position: absolute;
  z-index: ${zStack.hud};
  user-select: none;
  ${({ $left }) =>
    $left ? 'transform: scaleX(-1); right: 90%;' : 'left: 90%;'}

  @media (min-width: ${BREAK_DESKTOP}) {
    ${({ $left }) =>
      $left ? 'left: 0' : 'left: 100%; transform: translateX(-100%);'}
  }
`;

Dome.propTypes = {
  $left: PropTypes.bool,
};

export default Dome;
