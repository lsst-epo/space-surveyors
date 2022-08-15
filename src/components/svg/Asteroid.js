import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import asteroidSVG from '@assets/svg/asteroid.svg';

const Asteroid = styled(SVG).attrs(() => ({
  src: asteroidSVG,
}))`
  color: var(--neutral10);
`;

export default Asteroid;
