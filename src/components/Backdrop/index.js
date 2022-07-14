import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute } from '@styles/mixins/appearance';
import backdropNightImg from '@assets/image/backdrop_night_1.png';
import { DAY_TRANSITION_TIME } from '@constants/';
import Sun from './sun';
import StyledCloudDay from './cloud';

const BackdropContainer = styled.div`
  ${fullScreenAbsolute}
  z-index: ${zStack.backdrop};
`;

const BackdropDay = styled.div`
  ${fullScreenAbsolute}
  background-color: #5db8e8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const BackdropNight = styled.div.attrs(({ showEndgame }) => ({
  style: {
    opacity: showEndgame ? 0 : 1,
  },
}))`
  ${fullScreenAbsolute}
  background-color: #004b73;
  background-image: url('${backdropNightImg}');
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  transition: ${DAY_TRANSITION_TIME / 2}ms opacity;
  z-index: 2;
`;

const BackdropRenderer = ({ showEndgame }) => (
  <BackdropContainer>
    <BackdropNight {...{ showEndgame }}></BackdropNight>
    <BackdropDay>
      <Sun {...{ showEndgame }} />
      <StyledCloudDay {...{ showEndgame }} />
    </BackdropDay>
  </BackdropContainer>
);

BackdropRenderer.propTypes = {
  showEndgame: PropTypes.bool,
};

export default React.memo(BackdropRenderer);
