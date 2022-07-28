import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseMenu from '@components/Menus/BaseMenu';
import Button from '@components/Button';
import IconComposer from '@components/svg/IconComposer';
import IconContainer from '@components/svg/helpers/IconContainer';
import { GAME_DURATION, MENU_TRANSITION_TIME } from '@constants/index';
import { convertMsToTime } from '../../../utils';
import fundingLogos from '@assets/image/funding.png';
import rubinLogo from '@assets/image/rubin_over_black.png';
import FocalPlaneVisual from '@components/Menus/Landing/visuals/FocalPlaneVisual';
import MovementVisual from '@components/Menus/Landing/visuals/MovementVisual';
import OcclusionVisual from '@components/Menus/Landing/visuals/OcclusionVisual';

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  margin: 2em 0;
  flex-wrap: wrap;
  width: 800px;
  max-width: 100%;
`;

const LandingMenuTitle = styled.h1`
  font-size: 3em;
  font-style: italic;
`;

const IconLegend = styled.ul`
  color: var(--offWhite);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
`;

const IconItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.5;
`;

const RubinLogo = styled.img`
  height: 110px;
`;

const FundingLogos = styled.img`
  width: 800px;
  margin-top: auto;
  max-width: 100%;
`;

const Instructions = styled.ul`
  font-size: 1.5em;
  width: 800px;
  max-width: 100%;
  margin-bottom: 1em;
  list-style-position: inside;

  & > li {
    & > * {
      margin-top: 1em;
    }
  }

  & > li + li {
    margin-top: 1em;
  }
`;

const icons = {
  star: 'Stars',
  galaxy: 'Galaxies',
  supernova: 'Supernovae',
  comet: 'Comets',
  asteroid: 'Asteroids',
};

const LandingMenu = ({ onMenuAction }) => {
  const [showMenu, setMenu] = useState(true);
  const handleGameStart = () => {
    setMenu(false);
    setTimeout(() => onMenuAction('start'), MENU_TRANSITION_TIME);
  };

  return (
    <BaseMenu {...{ showMenu }}>
      <TitleBar>
        <RubinLogo src={rubinLogo} height="110px" width="180px" />
        <LandingMenuTitle>Space Surveyors</LandingMenuTitle>
      </TitleBar>
      <Instructions>
        <li>
          In Space Surveyors you will have{' '}
          <strong>{convertMsToTime(GAME_DURATION)}</strong> before the night
          ends to survey as many objects as possible. Look for these objects:
          <IconLegend>
            {Object.keys(icons).map((i) => (
              <IconItem key={i}>
                <IconContainer>
                  <IconComposer icon={i} height="100%" />
                </IconContainer>
                {icons[i]}
              </IconItem>
            ))}
          </IconLegend>
        </li>
        <li>
          When the timer starts, click or tap anywhere on the screen to move the
          telescope to a new position and begin exposing an image.
          <MovementVisual />
        </li>
        <li>
          Celestial objects are not the only things in the night sky. Clouds,
          airplanes, and satellites may disrupt your camera and prevent it from
          surveying the objects you want.
          <OcclusionVisual />
        </li>
      </Instructions>
      <Button onClick={handleGameStart}>Start</Button>
      <FundingLogos src={fundingLogos} />
    </BaseMenu>
  );
};

LandingMenu.propTypes = {
  onMenuAction: PropTypes.func,
};

export default LandingMenu;
