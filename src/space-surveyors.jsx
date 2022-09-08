import React, { useRef, useState, useEffect } from "react";
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
import SettingsButtons from "@components/SettingsButtons";
import { MenuProvider } from "@contexts/menus";
import { DimensionsProvider } from "@contexts/dimensions";

const SpaceSurveyors = () => {
  const initialDimensions = {
    aspectRatio: null,
    fullWidth: null,
    fullHeight: null,
  };
  const [openMenus, setMenus] = useState(["intro"]);
  const [score, setScore] = useState(Score());
  const [dimensions, setDimensions] = useState(initialDimensions);
  const engine = useRef();

  const handleResize = ({ width, height }) => {
    setDimensions({
      ...dimensions,
      aspectRatio: getAspectRatio(width / (height * GAME_FIELD_SIZE)),
      fullWidth: width,
      fullHeight: height,
    });
  };

  useEffect(() => {
    if (engine.current) {
      engine.current.dispatch({ type: "resize", payload: dimensions });
    }
  }, [dimensions.aspectRatio]);

  const { ref: resizeRef } = useResizeObserver({ onResize: handleResize });

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

  const { aspectRatio } = dimensions;

  return (
    <SpaceSurveyorsContainer
      className="space-surveyors-container"
      ref={resizeRef}
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
            <GameStageContainer aspectRatio={aspectRatio}>
              <GameEngine
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
                ref={engine}
                entities={Entities(aspectRatio)}
                systems={Systems}
                onEvent={handleEvent}
              ></GameEngine>
              <Dome $left />
              <Dome />
            </GameStageContainer>
          )}
          <HUD score={score} />
          <SettingsButtons gameContainer={resizeRef} />
        </MenuProvider>
      </DimensionsProvider>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
