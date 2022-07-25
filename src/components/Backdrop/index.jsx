import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute } from '@styles/mixins/appearance';
import { DAY_TRANSITION_TIME } from '@constants/';
import Sun from './sun';
import StyledCloudDay from './cloud';
import Backdrop from '@components/svg/Backdrop';

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

const BackdropNight = styled(Backdrop).attrs(({ showEndgame }) => ({
  style: {
    opacity: showEndgame ? 0 : 1,
  },
}))`
  position: absolute;
  aspect-ratio: 16 / 9;
  min-width: 100%;
  min-height: 100%;
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
