import styled, { keyframes, css } from "styled-components";
import SVG from "react-inlinesvg";
import ExposureSVG from "@assets/svg/exposure.svg";
import { EXPOSURE_TIME } from "@constants/";

const expandExposure = keyframes`
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
  }
`;

const fadeExposure = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Exposure = styled(SVG).attrs(({ x = 0, y = 0, size, $pause }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
    animationFillMode: $pause ? "none" : "forwards",
  },
  src: ExposureSVG,
}))`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 500ms;
  opacity: 1;
  animation: ${fadeExposure} ${EXPOSURE_TIME * 3}ms;
  aspect-ratio: 1/1;
`;

const AnimatedExposure = styled(Exposure).attrs(({ $pause }) => ({
  style: {
    animationFillMode: "forwards",
    animationPlayState: $pause ? "paused" : "running",
  },
}))`
  opacity: 1;
  animation: ${expandExposure} ${EXPOSURE_TIME}ms forwards;
`;

export { Exposure, AnimatedExposure };
