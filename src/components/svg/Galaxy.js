import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import galaxySVG from '@assets/svg/galaxy.svg';

const Galaxy = styled(SVG).attrs(() => ({
  src: galaxySVG,
}))`
  color: var(--neutral10);
`;

export default Galaxy;
