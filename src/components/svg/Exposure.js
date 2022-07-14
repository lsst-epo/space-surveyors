import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import ExposureSVG from '@assets/svg/exposure.svg';

const Exposure = styled(SVG).attrs(({ x, y, size }) => ({
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
