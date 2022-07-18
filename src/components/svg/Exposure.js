import styled, { keyframes } from 'styled-components';
import SVG from 'react-inlinesvg';
import ExposureSVG from '@assets/svg/exposure.svg';
import { EXPOSURE_TIME } from '@constants/';

const expandExposure = keyframes`
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
  }
`;

const Exposure = styled(SVG).attrs(({ x, y, size, $pause }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
    animationPlayState: $pause ? 'paused' : 'running',
  },
  src: ExposureSVG,
}))`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  animation: ${expandExposure} ${EXPOSURE_TIME}ms;
`;

export default Exposure;
