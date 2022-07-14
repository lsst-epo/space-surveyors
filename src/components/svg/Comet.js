import SVG from 'react-inlinesvg';
import cometSVG from '@assets/svg/comet.svg';

const Comet = (props) =>
  props.renderAsImg ? (
    <img src={cometSVG} {...props} />
  ) : (
    <SVG src={cometSVG} {...props} />
  );

export default Comet;
