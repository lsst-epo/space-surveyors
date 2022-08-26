import styled, { css } from "styled-components";
import { MENU_SLIDE_TIME, MENU_SLIDE_DELAY } from "@constants/index";
import { fullScreenAbsolute } from "@styles/mixins/appearance";
import { zStack } from "@styles/globalStyle";
import introScreenM from "@assets/image/title_screen_m.png";
import introScreenD from "@assets/image/title_screen_d.png";
import introScreenT from "@assets/image/title_screen_t.png";

const sizes = {
  d: introScreenD,
  m: introScreenM,
  t: introScreenT,
};

const styles = {
  d: css`
    height: 40%;
  `,
  m: css`
    flex-direction: column;
    width: 100%;
  `,
  t: css`
    height: 60%;
  `,
};

export const IntroContainer = styled.div.attrs(({ open }) => ({
  style: {
    transform: `translateY(${open ? "0" : "-100"}%)`,
    pointerEvents: open ? "auto" : "none",
  },
}))`
  ${fullScreenAbsolute}
  background-attachment: fixed;
  background-image: url(${({ imageSize }) => sizes[imageSize]});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: transform ${MENU_SLIDE_TIME}ms ease-in;
  transition-delay: ${MENU_SLIDE_DELAY}ms;
  z-index: ${zStack.menu + 1};
`;

export const IntroButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: 0.5rem;

  ${({ imageSize }) => styles[imageSize]}
`;
