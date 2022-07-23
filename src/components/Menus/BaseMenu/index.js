import React from 'react';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute } from '@styles/mixins/appearance';
import { MENU_SLIDE_TIME, MENU_SLIDE_DELAY } from '@constants/index';

const BaseMenu = styled.div.attrs(({ showMenu }) => ({
  style: {
    transform: `translateY(${showMenu ? '0' : '100'}%)`,
    pointerEvents: showMenu ? 'auto' : 'none',
  },
}))`
  background-color: var(--black);
  color: var(--turquoise50);
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
  ${fullScreenAbsolute}
  z-index: ${zStack.menu};
  transition: transform ${MENU_SLIDE_TIME}ms ease-in;
  transition-delay: ${MENU_SLIDE_DELAY}ms;
`;

export default BaseMenu;
