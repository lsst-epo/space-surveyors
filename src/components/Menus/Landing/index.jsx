import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MenuWrapper from "../styles";
import Button from "@components/Button";
import IconComposer from "@components/svg/IconComposer";
import IconContainer from "@components/svg/helpers/IconContainer";
import { GAME_DURATION, MENU_TRANSITION_TIME } from "@constants/index";
import { convertMsToTime } from "../../../utils";
import fundingLogos from "@assets/image/funding.png";
import rubinLogo from "@assets/image/rubin_over_black.png";
import MovementVisual from "@components/Menus/Landing/visuals/MovementVisual";
import OcclusionVisual from "@components/Menus/Landing/visuals/OcclusionVisual";

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
  list-style: none;

  & > li {
    & > * {
      margin-top: 1em;
    }
  }

  & > li + li {
    margin-top: 1em;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const icons = {
  star: "Stars",
  galaxy: "Galaxies",
  supernova: "Supernovae",
  comet: "Comets",
  asteroid: "Asteroids",
};

const LandingMenu = ({ onMenuClose, onMenuOpen, engine, menu }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleGameStart = () => {
    setMenuOpen(false);
  };

  const handleSettingsOpen = () => {
    onMenuOpen("settings");
  };

  useEffect(() => {
    if (menuOpen === false) {
      const timer = setTimeout(() => {
        onMenuClose(menu);
        engine.current.dispatch({ type: "gameStart" });
      }, MENU_TRANSITION_TIME);

      return () => clearTimeout(timer);
    }
  });

  return (
    <MenuWrapper open={menuOpen}>
      <TitleBar>
        <RubinLogo src={rubinLogo} height="110px" width="180px" />
        <LandingMenuTitle>Space Surveyors</LandingMenuTitle>
      </TitleBar>
      <Instructions>
        <li>
          <p>
            In Space Surveyors you will have{" "}
            <strong>{convertMsToTime(GAME_DURATION)}</strong> before the night
            ends to survey as many objects as possible. Look for these objects:
          </p>
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
          <p>
            <strong>
              Objects may be very small or faint in the night sky, how can you
              optimize finding these difficult to see objects?
            </strong>
          </p>
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
      <ButtonContainer>
        <Button onClick={handleSettingsOpen} styleAs="tertiary">
          Settings
        </Button>
        <Button onClick={handleGameStart}>Start</Button>
      </ButtonContainer>
      <FundingLogos src={fundingLogos} />
    </MenuWrapper>
  );
};

LandingMenu.propTypes = {};

export default LandingMenu;
