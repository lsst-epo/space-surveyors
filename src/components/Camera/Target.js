import styled from 'styled-components';
import { TARGET_SIZE } from '@constants/index';

const StyledCameraTarget = styled.div.attrs(({ x, y, size }) => ({
  style: {
    left: `calc(${x}% - ${size / 2}px)`,
    top: `calc(${y}% - ${size / 2}px)`,
  },
}))`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: var(--red);
  opacity: 0.5;
  position: absolute;
`;

const CameraTarget = ({ x, y }) => {
  const size = TARGET_SIZE;
  return <StyledCameraTarget {...{ x, y, size }} />;
};

export default CameraTarget;
