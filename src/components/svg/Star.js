import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import starSVG from '@assets/svg/star.svg';

// const Star = (props) => <SVG src={starSVG} {...props} />;
const Star = styled(SVG).attrs(() => ({
  src: starSVG,
}))`
  color: var(--neutral10);
  transition: color 0.2s;
`;

export default Star;
