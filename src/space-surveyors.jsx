import React, { useRef, useState } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { GameEngine } from "react-game-engine";
import { GAME_FIELD_SIZE } from "@constants/index";
import { getAspectRatio } from "./utils";
import SpaceSurveyorsContainer from "@components/containers/SpaceSurveyorsContainer";
import GameStageContainer from "@components/containers/GameStageContainer";
import GameMenus from "@components/Menus";
import Entities from "@entities/index";
import Score from "@entities/score";
import Systems from "@systems/index";
import HUD from "@components/HUD/hud";
import Dome from "@components/HUD/dome";
import SettingsButton from "@components/SettingsButton";
import { MenuProvider } from "@contexts/menus";
import { DimensionsProvider } from "@contexts/dimensions";

const SpaceSurveyors = () => {
  const initialDimensions = {
    boundingRect: null,
    aspectRatio: null,
    fullWidth: null,
    fullHeight: null,
  };
  const [openMenus, setMenus] = useState(["intro"]);
  const [score, setScore] = useState(Score());
  const [dimensions, setDimensions] = useState(initialDimensions);
  const engine = useRef();
  const resizeRef = useRef(null);

  const handleResize = ({ width, height }) => {
    const boundingRect = resizeRef.current.getBoundingClientRect();

    setDimensions({ ...dimensions, boundingRect });
  };

  const handleOuterResize = ({ width, height }) => {
    setDimensions({
      ...dimensions,
      aspectRatio: getAspectRatio(width / (height * GAME_FIELD_SIZE)),
      fullWidth: width,
      fullHeight: height,
    });
  };

  const {
    ref: outerResizeRef,
    width: outerWidth,
    height: outerHeight,
  } = useResizeObserver({ onResize: handleOuterResize });

  const { width, height } = useResizeObserver({
    ref: resizeRef,
    onResize: handleResize,
  });

  const handleEvent = (event) => {
    const { type, payload } = event;
    console.debug(type);

    switch (type) {
      case "showFinish":
        setMenus(["finished", ...openMenus]);
        break;
      case "scoreUpdate":
        setScore({ ...payload });
        break;
      case "quit":
        setMenus(["summary"]);
        break;
      default:
        break;
    }
  };

  const { boundingRect, aspectRatio } = dimensions;

  return (
    <SpaceSurveyorsContainer
      className="space-surveyors-container"
      ref={outerResizeRef}
    >
      <DimensionsProvider value={{ setDimensions, dimensions }}>
        <MenuProvider value={{ setMenus, openMenus }}>
          <GameMenus
            {...{
              score,
              engine,
            }}
          />
          {aspectRatio && (
            <GameStageContainer ref={resizeRef} aspectRatio={aspectRatio}>
              {boundingRect && (
                <GameEngine
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                  ref={engine}
                  entities={Entities(boundingRect, aspectRatio)}
                  systems={Systems}
                  onEvent={handleEvent}
                ></GameEngine>
              )}
              <Dome $left />
              <Dome />
              <SettingsButton />
            </GameStageContainer>
          )}
          <HUD score={score} />
        </MenuProvider>
      </DimensionsProvider>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
