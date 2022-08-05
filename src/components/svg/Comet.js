import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import cometSVG from '@assets/svg/comet.svg';

const Comet = styled(SVG).attrs(() => ({
  src: cometSVG,
}))`
  color: var(--neutral10);
`;

export default Comet;
