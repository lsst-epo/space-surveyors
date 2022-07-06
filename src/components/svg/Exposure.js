import styled from 'styled-components';
import ExposureSVG from '@assets/svg/exposure.svg';
import { CAMERA_SIZE } from '@constants/';

const size = CAMERA_SIZE;

const Exposure = styled.img.attrs(({ x, y }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: size,
    height: size,
  },
  src: ExposureSVG,
}))`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
`;

export default Exposure;
