import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import Dome from '@components/svg/Dome';
import HUDScore from '@components/HUD/score';

const HUDBackdrop = styled.div`
  background-color: #021a18;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 1em 2em;
  width: 100%;
  height: 20%;
  bottom: 0;
  position: absolute;
  z-index: ${zStack.hud};
`;

const HUD = ({ score }) => (
  <>
    <Dome $left></Dome>
    <Dome></Dome>
    <HUDBackdrop>
      <HUDScore {...{ score }}></HUDScore>
    </HUDBackdrop>
  </>
);

export default HUD;
