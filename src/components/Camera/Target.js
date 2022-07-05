import styled from 'styled-components';
import { TARGET_SIZE } from '@constants/index';

const size = TARGET_SIZE;
const offset = size / 2;

const CameraTarget = styled.div.attrs(({ x, y }) => ({
  style: {
    left: `calc(${x}% - ${offset}px)`,
    top: `calc(${y}% - ${offset}px)`,
  },
}))`
  width: ${size}px;
  height: ${size}px;
  border-radius: ${offset}px;
  background-color: var(--red);
  opacity: 0.5;
  position: absolute;
`;

export default CameraTarget;
