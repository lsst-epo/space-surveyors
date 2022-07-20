import styled from 'styled-components';

const CameraTarget = styled.div.attrs(({ x, y, size }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size / 5}%`,
  },
}))`
  border-radius: 50%;
  background-color: var(--red);
  opacity: 0.5;
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1 / 1;
`;

export default CameraTarget;
