import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import supernovaSVG from '@assets/svg/supernova.svg';

const Supernova = styled(SVG).attrs(() => ({
  src: supernovaSVG,
}))`
  color: var(--neutral10);
`;

export default Supernova;
