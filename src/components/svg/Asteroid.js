import SVG from 'react-inlinesvg';
import asteroidSVG from '@assets/svg/asteroid.svg';

const Asteroid = (props) =>
  props.renderAsImg ? (
    <img src={asteroidSVG} {...props} />
  ) : (
    <SVG src={asteroidSVG} {...props} />
  );

export default Asteroid;
