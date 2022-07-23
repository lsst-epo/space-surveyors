import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseMenu from '@components/Menus/BaseMenu';
import Button from '@components/Button';
import IconComposer from '@components/svg/IconComposer';
import IconContainer from '@components/svg/helpers/IconContainer';
import { GAME_TIME, MENU_TRANSITION_TIME } from '@constants/index';
import { convertMsToTime } from '../../../utils';
import instructionsCameraTarget from '@assets/image/instructions-camera-target.jpg';
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

const InstructionsList = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
  grid-auto-flow: dense;
  min-width: 80%;
  width: 800px;
  margin-bottom: 1em;
  max-width: 100%;
  list-style-position: inside;
`;

const InstructionsListItem = styled.li`
  border-radius: 0.5rem;
  background-color: var(--turquoise70);
  color: var(--neutral10);
  font-size: 1.2em;
  list-style: none;
  padding: 0.5em 1em;

  > * + * {
    margin-top: 1em;
  }
`;

const IconLegend = styled.ul`
  list-style: none;
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
      <InstructionsList>
        <InstructionsListItem>
          <h2>Scan the night sky</h2>
          <p>
            The Vera Rubin Observatory will capture ~10 million objects every
            night with it's 8.4 meter primary camera. The focal plane of the
            camera spans 3.5° of the night sky, roughly 7 times as large as the
            full moon appears.
          </p>
          <FocalPlaneVisual />
          <p>
            In Space Surveyors you will have{' '}
            <strong>{convertMsToTime(GAME_TIME)}</strong> before the night is
            over to survey as many objects as possible.
          </p>
          <h3>Look for these objects</h3>
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
        </InstructionsListItem>
        <InstructionsListItem>
          <h2>Use Rubin's camera</h2>
          <p>
            When the timer starts, click or tap anywhere on the screen to begin
            moving the telescope's focal plane to a new position. When the focal
            plane arrives at it's next location, it will begin exposing an image
            to survey.
          </p>
          <MovementVisual />
          <p>
            Every camera exposure will take time so plan your moves carefully,
            the night only lasts so long!
          </p>
        </InstructionsListItem>
        <InstructionsListItem>
          <h2>Watch out!</h2>
          <p>
            Celestial objects are not the only things in the night sky. Clouds,
            airplanes, and satellites may disrupt your camera and prevent it
            from surveying the objects you want.
          </p>
          <OcclusionVisual />
        </InstructionsListItem>
      </InstructionsList>
      <Button onClick={handleGameStart}>Start</Button>
      <FundingLogos src={fundingLogos} />
    </BaseMenu>
  );
};

LandingMenu.propTypes = {
  onMenuAction: PropTypes.func,
};

export default LandingMenu;
