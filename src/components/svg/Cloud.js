import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import cloudSvg from '@assets/svg/cloud.svg';
import { SUNRISE_DURATION } from '@constants/index';

const Cloud = styled(SVG).attrs(() => ({ src: cloudSvg }))`
  .cloud-inner,
  .cloud-edge {
    transition: ${SUNRISE_DURATION - 2000}ms color
      cubic-bezier(0.12, 0, 0.39, 0);
    transition-delay: 2000ms;
    fill: currentColor;
  }

  ${({ variant }) =>
    variant === 'night'
      ? `.cloud-inner {color: #4d4f4f} .cloud-edge {color: #6a6e6e}`
      : `.cloud-inner {color: #ecf2f2} .cloud-edge {color: #f6ffff}`}
`;

export default Cloud;
