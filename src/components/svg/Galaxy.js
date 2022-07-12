import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import galaxySVG from '@assets/svg/galaxy.svg';

const Galaxy = styled(SVG).attrs(() => ({
  src: galaxySVG,
}))`
  color: var(--neutral10);
  transition: color 0.2s;
`;

export default Galaxy;
