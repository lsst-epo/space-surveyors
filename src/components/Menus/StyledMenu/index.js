import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute } from '@styles/mixins/appearance';

const StyledMenu = styled.div`
  background-color: var(--black);
  color: var(--turquoise50);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${fullScreenAbsolute}
  z-index: ${zStack.menu};
`;

export default StyledMenu;
