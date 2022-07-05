import styled from 'styled-components';
import ExposureSVG from '@assets/svg/exposure.svg';
import { CAMERA_SIZE } from '@constants/';

const size = CAMERA_SIZE;
const offset = size / 2;

const Exposure = styled.img.attrs(({ x, y }) => ({
  style: {
    left: `calc(${x}% - ${offset}px)`,
    top: `calc(${y}% - ${offset}px)`,
    width: size,
    height: size,
  },
  src: ExposureSVG,
}))`
  position: absolute;
  pointer-events: none;
`;

export default Exposure;
