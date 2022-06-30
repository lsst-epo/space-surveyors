import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GAME_TIME } from '@constants/index';
import { convertMsToTime } from '@utils/';
import { zStack } from '@styles/globalStyle';
import LinearProgress from '@components/Progress';

const StyledTimeContainer = styled.div`
  position: absolute;
  z-index: ${zStack.timer};
  color: var(--yellow);
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  padding: 1em;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

const TimerRenderer = ({ timeRemaining }) => {
  const percentTimeRemaining = +((timeRemaining / GAME_TIME) * 100).toFixed(2);
  return (
    <StyledTimeContainer role="timer">
      Time left: {convertMsToTime(timeRemaining)}
      <LinearProgress value={percentTimeRemaining}></LinearProgress>
    </StyledTimeContainer>
  );
};

TimerRenderer.propTypes = {
  timeRemaining: PropTypes.number,
};

export default TimerRenderer;
