import React, { useRef } from "react";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components";
import { zStack } from "@styles/globalStyle";
import { fullScreenAbsolute, flexCentered } from "@styles/mixins/appearance";
import { GAME_FIELD_SIZE } from "@constants/index";
import CenteredText from "@components/svg/helpers/CenteredText";

const FinishedMenu = styled.svg.attrs(({ isOpen }) => ({
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

const FinishedScreen = ({ aspectRatio, isOpen }) => {
  const { ref, width } = useResizeObserver();
  const finishedMessage = "Time's up!";
  const charSize = finishedMessage.length / 2;
  return (
    <FinishedMenu isOpen={isOpen}>
      <CenteredText
        ref={ref}
        $width={width}
        textLength="50%"
        {...{ charSize, aspectRatio }}
      >
        {finishedMessage}
      </CenteredText>
    </FinishedMenu>
  );
};

export default FinishedScreen;
