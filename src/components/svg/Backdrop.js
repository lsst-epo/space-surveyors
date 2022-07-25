import SVG from 'react-inlinesvg';
import backdropSvg from '@assets/svg/backdrop_night_1.svg';

const Backdrop = ({ style, className }) => (
  <SVG src={backdropSvg} {...{ style, className }} />
);

export default Backdrop;
