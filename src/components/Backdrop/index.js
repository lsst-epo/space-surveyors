import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zStack } from '@styles/globalStyle';

const BackdropRenderer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${zStack.backdrop};
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.isGameplayRunning ? '#004b73' : '#5db8e8'};
`;

BackdropRenderer.propTypes = {
  isGameplayRunning: PropTypes.bool,
};

export default BackdropRenderer;
