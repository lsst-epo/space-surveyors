import { MENU_SLIDE_DELAY } from "@constants/";
import { MENU_SLIDE_TIME } from "@constants/";
import { fullScreenAbsolute } from "@styles/mixins/appearance";
import { zStack } from "@styles/globalStyle";
import styled from "styled-components";
import Button from "@components/Button";

export const SettingsMenuOuter = styled.div.attrs(({ open }) => ({
  style: {
    backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "rgba(0,0,0,0)",
    pointerEvents: open ? "auto" : "none",
  },
}))`
  ${fullScreenAbsolute}
  transition: background-color ${MENU_SLIDE_TIME}ms;
  z-index: ${zStack.menu};
`;

export const SettingsMenuInner = styled.div.attrs(({ open }) => ({
  style: {
    transform: open ? "translateX(0)" : "translateX(-100%)",
    pointerEvents: open ? "auto" : "none",
  },
}))`
  background-color: #000;
  max-width: 400px;
  height: 100%;
  padding: 30px 34px;
  transition: transform ${MENU_SLIDE_TIME}ms;
  position: absolute;
  top: 0;
  left: 0;
`;

export const SubmenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 12px;
`;

export const SubmenuTitle = styled.h2`
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
`;

export const SubmenuDescription = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
  color: #fff;
`;

export const SettingsSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const SubmenuContentWrapper = styled.div`
  height: 100%;
`;

export const SubmenuSection = styled.nav`
  color: var(--offWhite);
  padding-top: 20px;
  border-top: 1px solid #707070;
  > button + button {
    margin-top: 20px;
  }
`;

export const SubmenuSectionHeading = styled.h3`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  padding-bottom: 20px;
`;

export const SubmenuNavItems = styled.ul`
  list-style: none;
  padding: 12px 0 0 25px;
`;

export const SubmenuNavItem = styled.li`
  & + & {
    margin-top: 20px;
  }
`;

export const SubmenuButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background-color: transparent;
  border: 0;
  border-radius: unset;

  svg {
    color: var(--turquoise55);

    path {
      stroke: var(--turquoise55);
    }
  }

  &:hover {
    outline: none;
  }
`;

export const CreditList = styled.dl`
  > dt {
    font-weight: bold;
  }
`;

export const ShareButtonsList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;
