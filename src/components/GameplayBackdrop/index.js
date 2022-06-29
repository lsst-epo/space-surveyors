import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BackdropRenderer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isGameplayRunning ? 'steelblue' : 'skyblue'};
`;

BackdropRenderer.propTypes = {
  isGameplayRunning: PropTypes.bool,
};

export default BackdropRenderer;
