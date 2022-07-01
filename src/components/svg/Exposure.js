import styled from 'styled-components';
import ExposureSVG from '@assets/svg/exposure.svg';
import { CAMERA_SIZE } from '@constants/';

const StyledExposure = styled.img.attrs(({ x, y, offset }) => ({
  style: {
    left: `calc(${x}% - ${offset}px)`,
    top: `calc(${y}% - ${offset}px)`,
  },
}))`
  position: absolute;
`;

const Exposure = ({ x, y }) => {
  const size = CAMERA_SIZE;
  return (
    <StyledExposure
      src={ExposureSVG}
      width={size}
      height={size}
      offset={size / 2}
      {...{ x, y }}
    />
  );
};

export default Exposure;
