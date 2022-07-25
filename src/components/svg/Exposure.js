import styled, { keyframes, css } from 'styled-components';
import SVG from 'react-inlinesvg';
import ExposureSVG from '@assets/svg/exposure.svg';
import { EXPOSURE_TIME } from '@constants/';

const expandExposure = keyframes`
  0% {
    opacity: 1;
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  25% {
    opacity: 1;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
  }
  100% {
    opacity: 0;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
  }
`;

const Exposure = styled(SVG).attrs(({ x, y, size, $pause }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
  },
  src: ExposureSVG,
}))`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  ${({ $pause }) =>
    $pause
      ? ''
      : css`
          animation: ${expandExposure} ${EXPOSURE_TIME * 4}ms forwards;
        `}
`;

export default Exposure;
