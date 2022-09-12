import styled from "styled-components";
import CenteredText from "@components/svg/helpers/CenteredText";
import { fullScreenAbsolute } from "@styles/mixins/appearance";
import { zStack } from "@styles/globalStyle";

export const CameraContainer = styled.div`
  ${fullScreenAbsolute}
  user-select: none;
  z-index: ${zStack.camera};
`;

export const CameraTarget = styled.div.attrs(({ x, y, size }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size / 5}%`,
  },
}))`
  border-radius: 50%;
  background-color: var(--red);
  opacity: 0.5;
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1 / 1;
`;

export const ExposureText = styled(CenteredText)`
  fill: var(--neutral10);
  font-weight: bold;
  text-shadow: 2px 2px 0 var(--neutral90);
`;
