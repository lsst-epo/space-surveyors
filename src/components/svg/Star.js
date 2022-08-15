import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import starSVG from '@assets/svg/star.svg';

const Star = styled(SVG).attrs(() => ({
  src: starSVG,
}))`
  color: var(--neutral10);
`;

export default Star;
