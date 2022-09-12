import React from "react";
import useResizeObserver from "use-resize-observer";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GAME_DURATION, MIN_OBJECT_Y } from "@constants/index";
import { convertMsToTime } from "@lib/utils";
import {
  zStack,
  BREAK_TABLET_MIN,
  BREAK_DESKTOP,
  getRawPx,
} from "@styles/globalStyle";
import LinearProgress from "@components/Progress";
import { Trans } from "react-i18next";

const StyledTimeContainer = styled.div`
  position: absolute;
  z-index: ${zStack.timer};
  color: var(--yellow);
  top: 0;
  left: 0;
  margin: 0 10%;
  width: 80%;
  height: ${MIN_OBJECT_Y}%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? "2.5em" : "1.5em"};
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

const TimerRenderer = ({ timeRemaining }) => {
  const { ref, width } = useResizeObserver();
  const percentTimeRemaining = +((timeRemaining / GAME_DURATION) * 100).toFixed(
    2
  );
  return (
    <StyledTimeContainer role="timer" ref={ref} width={width}>
      <Trans values={{ remaining: convertMsToTime(timeRemaining) }}>
        timer
      </Trans>
      <LinearProgress value={percentTimeRemaining}></LinearProgress>
    </StyledTimeContainer>
  );
};

TimerRenderer.propTypes = {
  timeRemaining: PropTypes.number,
};

export default TimerRenderer;
