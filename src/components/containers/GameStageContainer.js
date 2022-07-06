import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';

export const GameStageContainer = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  z-index: ${zStack.game};
`;
