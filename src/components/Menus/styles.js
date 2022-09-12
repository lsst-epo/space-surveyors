import styled from "styled-components";
import { zStack } from "@styles/globalStyle";
import { fullScreenAbsolute, flexCentered } from "@styles/mixins/appearance";
import {
  MENU_SLIDE_TIME,
  MENU_SLIDE_DELAY,
  GAME_FIELD_SIZE,
} from "@constants/index";
import fundingLogos from "@assets/image/funding.png";
import rubinLogo from "@assets/image/rubin_over_black.png";

export const FinishedMenu = styled.svg.attrs(({ isOpen }) => ({
  style: { ...(!isOpen && { display: "none" }) },
}))`
  ${fullScreenAbsolute}
  height: ${GAME_FIELD_SIZE * 100}%;
  ${flexCentered}
  color: var(--neutral95);
  font-weight: bold;
  z-index: ${zStack.menu};
  user-select: none;
  pointer-events: none;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
`;

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

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  margin: 2em 0;
  flex-wrap: wrap;
`;

export const IconLegend = styled.ul`
  color: var(--offWhite);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
`;

export const IconItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.5;
`;

export const RubinLogo = styled.img.attrs({ src: rubinLogo })`
  height: 110px;
  width: 180px;
`;

export const FundingLogos = styled.img.attrs({ src: fundingLogos })`
  margin-top: auto;
`;

export const Instructions = styled.ul`
  font-size: 1.5em;
  margin-bottom: 1em;
  list-style: none;

  & > li {
    & > * {
      margin-top: 1em;
    }
  }

  & > li + li {
    margin-top: 1em;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
