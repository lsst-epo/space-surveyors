import styled from 'styled-components';
import { TARGET_SIZE } from '@constants/index';

const size = TARGET_SIZE;
const offset = size / 2;

const CameraTarget = styled.div.attrs(({ x, y }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
  },
}))`
  width: ${size}%;
  border-radius: 50%;
  background-color: var(--red);
  opacity: 0.5;
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1 / 1;
`;

export default CameraTarget;
