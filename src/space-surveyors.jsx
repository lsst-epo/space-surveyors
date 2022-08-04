import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GameEngine } from 'react-game-engine';
import { GAME_FIELD_SIZE } from '@constants/index';
import SpaceSurveyorsContainer from '@components/containers/SpaceSurveyorsContainer';
import GameMenus from '@components/Menus';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';
import { GameStageContainer } from '@components/containers/GameStageContainer';
import HUD from '@components/HUD/hud';
import Dome from '@components/HUD/dome';
import Score from '@entities/score';
import { getAspectRatio } from './utils';

const SpaceSurveyors = () => {
  const initialState = {
    menu: 'landing',
    score: Score(),
    boundingRect: null,
    aspectRatio: null,
  };
  const [state, setState] = useState(initialState);
  const engine = useRef();
  const resizeRef = useRef(null);

  const handleResize = ({ width, height }) => {
    const boundingRect = resizeRef.current.getBoundingClientRect();
    if (engine.current) {
      engine.current.dispatch({ type: 'resize', payload: boundingRect });
    }
    setState({ ...state, boundingRect });
  };

  const handleOuterResize = ({ width, height }) => {
    const { aspectRatio } = state;
    if (!aspectRatio) {
      setState({
        ...state,
        aspectRatio: getAspectRatio(width / (height * GAME_FIELD_SIZE)),
      });
    }
    if (resizeRef.current) {
      handleResize({});
    }
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

  const handleMenuAction = (action) => {
    console.debug('menu', action);
    switch (action) {
      case 'start':
        setState({ ...state, menu: null });
        engine.current.dispatch({ type: 'gameStart' });
        break;
      case 'restart':
        setState({ ...state, score: Score() });
        engine.current.swap(Entities(boundingRect, aspectRatio));
        break;
      default:
        break;
    }
  };

  const handleEvent = (event) => {
    const { type, payload } = event;
    console.debug(type);

    switch (type) {
      case 'swapped':
        handleMenuAction('start');
        break;
      case 'showFinish':
        setState({ ...state, menu: 'finished' });
        break;
      case 'scoreUpdate':
        setState({ ...state, score: payload });
        break;
      case 'quit':
        setState({ ...state, menu: 'summary' });
        break;
      default:
        break;
    }
  };

  const { menu, score, boundingRect, aspectRatio } = state;
  const GameMenu = GameMenus[menu];

  return (
    <SpaceSurveyorsContainer
      className="space-surveyors-container"
      ref={outerResizeRef}
    >
      {menu && (
        <GameMenu
          onMenuAction={handleMenuAction}
          {...{ score, aspectRatio }}
        ></GameMenu>
      )}
      {aspectRatio && (
        <GameStageContainer ref={resizeRef} aspectRatio={aspectRatio}>
          {boundingRect && (
            <GameEngine
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              ref={engine}
              entities={Entities(boundingRect, aspectRatio)}
              systems={Systems}
              onEvent={handleEvent}
            ></GameEngine>
          )}
          <Dome $left />
          <Dome />
        </GameStageContainer>
      )}
      <HUD score={score} />
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
