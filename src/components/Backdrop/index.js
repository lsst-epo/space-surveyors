import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zStack } from '@styles/globalStyle';

const BackdropRenderer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${zStack.backdrop};
  transition: background-color 0.2s;
  background-color: ${(props) => (props.showEndgame ? '#5db8e8' : '#004b73')};
`;

BackdropRenderer.propTypes = {
  showEndgame: PropTypes.bool,
};

export default BackdropRenderer;
