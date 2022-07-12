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
    boundingRect: null,
  };
  const [state, setState] = useState(initialState);
  const engine = useRef();
  const resizeRef = useRef(null);

  const handleResize = ({ width, height }) => {
    const boundingRect = resizeRef.current.getBoundingClientRect();
    setState({ ...state, boundingRect });
  };

  const { ref, width, height } = useResizeObserver({
    ref: resizeRef,
    onResize: handleResize,
  });

  const handleMenuAction = (action) => {
    switch (action) {
      case 'start':
        setState({ ...state, menu: null });
        engine.current.start();
        break;
      case 'restart':
        window.location.reload(false);
        break;
      default:
        break;
    }
  };

  const handleEvent = (event) => {
    const { type, payload } = event;
    console.debug(type);

    switch (type) {
      case 'scoreUpdate':
        setState({ ...state, score: payload });
        break;
      case 'quit':
        engine.current.stop();
        break;
      case 'stopped':
        setState({ ...state, menu: 'summary' });
        break;
      default:
        break;
    }
  };

  const { menu, running, score, boundingRect } = state;
  const GameMenu = GameMenus[menu];

  return (
    <SpaceSurveyorsContainer className="space-surveyors-container">
      {menu && <GameMenu onMenuAction={handleMenuAction}></GameMenu>}
      <GameStageContainer ref={resizeRef}>
        {boundingRect && (
          <GameEngine
            style={{ width: '100%', height: '100%' }}
            ref={engine}
            entities={Entities(boundingRect)}
            systems={Systems}
            running={running}
            onEvent={handleEvent}
          ></GameEngine>
        )}
      </GameStageContainer>
      <HUD score={score} />
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
