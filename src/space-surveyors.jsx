import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import StyledGameStage from '@components/GameStage';
import GameMenus from '@components/Menus';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const initialState = {
    menu: 'landing',
    running: false,
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
      default:
        break;
    }
  };

  const { menu, running } = state;
  const GameMenu = GameMenus[menu];

  return (
    <SpaceSurveyorsContainer
      ref={resizeRef}
      className="space-surveyors-container"
    >
      {menu && <GameMenu onMenuAction={handleMenuAction}></GameMenu>}
      <StyledGameStage
        ref={engine}
        entities={Entities()}
        systems={Systems}
        running={running}
        onEvent={handleEvent}
      ></StyledGameStage>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
