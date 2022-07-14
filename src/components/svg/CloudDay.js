import SVG from 'react-inlinesvg';
import cloudDaySvg from '@assets/svg/cloudDay.svg';

const CloudDay = ({ style, className }) => (
  <SVG src={cloudDaySvg} {...{ style, className }} />
);

export default CloudDay;
