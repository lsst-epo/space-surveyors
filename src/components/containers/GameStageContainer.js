import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';

export const GameStageContainer = styled.div.attrs(({ aspectRatio }) => ({
  style: {
    aspectRatio,
  },
}))`
  flex-shrink: 0;
  height: 80%;
  position: relative;
  z-index: ${zStack.game};
  overflow: hidden;
`;
