import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';

const StyledMenu = styled.div`
  background-color: var(--black);
  color: var(--turquoise50);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: ${zStack.menu};
`;

export default StyledMenu;
