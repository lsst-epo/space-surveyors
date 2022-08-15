import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute } from '@styles/mixins/appearance';
import Sun from './sun';
import StyledCloudDay from './cloud';
import Backdrop from '@components/svg/Backdrop';
import {
  SUNRISE_DURATION,
  DAY_TRANSITION_DURATION,
  GAME_DURATION,
} from '@constants/index';

const sunriseMask = keyframes`
0% {
  mask-position: 0% 0%;
}
85% {
  opacity: 1;
}
100% {
  opacity: 0;
  mask-position: 0% 200%;
}`;

const sunriseColors = keyframes`
  0% {
    background-color: #fa6868;
  }
  50% {
    background-color: #cf4040;
  }
  75% {
    background-color: #fce7ae;
  }
  100% {
    background-color: #5db8e8;
  }
`;

const BackdropContainer = styled.div`
  ${fullScreenAbsolute}
  z-index: ${zStack.backdrop};
`;

const BackdropDay = styled.div`
  ${fullScreenAbsolute}
  background-color: #fa6868;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  ${({ showSunrise }) =>
    showSunrise
      ? css`
          animation: ${sunriseColors} ${SUNRISE_DURATION}ms linear forwards;
        `
      : ''}
`;

const BackdropNight = styled(Backdrop)`
  position: absolute;
  aspect-ratio: 16 / 9;
  mask-type: alpha;
  mask-size: 100% 200%;
  mask-repeat: no-repeat;
  mask-image: linear-gradient(
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  mask-position: top;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: ${DAY_TRANSITION_DURATION}ms opacity;
  z-index: 2;

  ${({ showSunrise }) =>
    showSunrise
      ? css`
          animation: ${sunriseMask} ${SUNRISE_DURATION}ms
            cubic-bezier(0.12, 0, 0.39, 0) forwards;
        `
      : ''}
`;

const BackdropRenderer = ({ showEndgame, showSunrise }) => (
  <BackdropContainer>
    <BackdropNight {...{ showSunrise }}></BackdropNight>
    <BackdropDay {...{ showSunrise }}>
      <Sun {...{ showEndgame }} />
      <StyledCloudDay {...{ $showEndgame: showEndgame }} />
    </BackdropDay>
  </BackdropContainer>
);

BackdropRenderer.propTypes = {
  showEndgame: PropTypes.bool,
  showSunrise: PropTypes.bool,
};

export default React.memo(BackdropRenderer);
