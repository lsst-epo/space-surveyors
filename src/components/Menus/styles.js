import styled from "styled-components";
import { zStack } from "@styles/globalStyle";
import { fullScreenAbsolute } from "@styles/mixins/appearance";
import { MENU_SLIDE_TIME, MENU_SLIDE_DELAY } from "@constants/index";

export const MenuWrapper = styled.div.attrs(({ open }) => ({
  style: {
    transform: `translateY(${open ? "0" : "100"}%)`,
    pointerEvents: open ? "auto" : "none",
  },
}))`
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : "var(--neutral95)"};
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

export const MenuResponsive = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 800px;
  max-width: 100%;
`;

export const MenuTitle = styled.h1`
  font-size: 3em;
  font-style: italic;
`;

export const MenuSubtitle = styled.h2`
  font-size: 2em;
`;
