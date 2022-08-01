import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import Dome from '@components/HUD/dome';
import HUDScore from '@components/HUD/score';

const HUDBackdrop = styled.div`
  background-color: #021a18;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 20%;
  bottom: 0;
  position: absolute;
  z-index: ${zStack.hud};
`;

const HUD = ({ score }) => (
  <HUDBackdrop>
    <HUDScore {...{ score }}></HUDScore>
  </HUDBackdrop>
);

HUD.propTypes = {
  score: PropTypes.object,
};

export default HUD;
