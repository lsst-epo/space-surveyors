import backdropSvg from '@assets/svg/backdrop_night_1.svg';

const Backdrop = ({ style, className }) => (
  <img src={backdropSvg} {...{ style, className }} />
);

export default Backdrop;
