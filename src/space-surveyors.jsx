import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GameEngine } from 'react-game-engine';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import GameMenus from '@components/Menus';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';
import { GameStageContainer } from '@components/containers/GameStageContainer';
import HUD from '@components/HUD/hud';
import entities from '@entities/index';
import Score from '@entities/score';

const SpaceSurveyors = () => {
  const initialState = {
    menu: 'landing',
    running: false,
    score: Score(),
  };
  const [state, setState] = useState(initialState);
  const engine = useRef();
  const resizeRef = useRef(null);

  const handleResize = (size) => {
    const boundingRect = resizeRef.current.getBoundingClientRect();
    engine.current.dispatch({ type: 'resize', payload: boundingRect });
  };

  useResizeObserver({
    ref: resizeRef,
    onResize: handleResize,
  });

  const handleMenuAction = (action) => {
    switch (action) {
      case 'start':
        setState({ ...state, menu: null });
        engine.current.start();

        // a resize needs to be performed after the game starts to set the current game dimensions
        handleResize({});
        break;
      case 'restart':
        window.location.reload(false);
      default:
        break;
    }
  };

  const handleEvent = (event) => {
    const { type } = event;
    console.debug(type);

    switch (type) {
      case 'quit':
        engine.current.stop();
      case 'stopped':
        setState({ ...state, menu: 'summary' });
      case 'cameraExposureEnd':
        const { payload } = event;
        setState({ ...state, score: payload });
      default:
        break;
    }
  };

  const { menu, running, score } = state;
  const GameMenu = GameMenus[menu];

  return (
    <SpaceSurveyorsContainer className="space-surveyors-container">
      {menu && <GameMenu onMenuAction={handleMenuAction}></GameMenu>}
      <GameStageContainer ref={resizeRef}>
        <GameEngine
          style={{ width: '100%', height: '100%' }}
          ref={engine}
          entities={Entities()}
          systems={Systems}
          running={running}
          onEvent={handleEvent}
        ></GameEngine>
      </GameStageContainer>
      <HUD score={score} />
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
