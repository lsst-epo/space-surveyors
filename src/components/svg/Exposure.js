import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import ExposureSVG from '@assets/svg/exposure.svg';
import { CAMERA_SIZE } from '@constants/';

const size = CAMERA_SIZE;

const Exposure = styled(SVG).attrs(({ x, y }) => ({
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
`;

export default Exposure;
