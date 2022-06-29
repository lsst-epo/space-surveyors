import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import StyledGameStage from '@components/GameStage';
import GameMenus from '@components/Menus';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const [menu, setMenu] = useState('landing');
  const engine = useRef();
  const running = false;

  const { ref: resizeRef } = useResizeObserver({
    onResize: (size) => {
      engine.current.dispatch({ type: 'resize', payload: size });
    },
  });

  const handleMenuAction = (action) => {
    switch (action) {
      case 'start':
        engine.current.start();
        setMenu(null);
        break;
      case 'restart':
        engine.current.swap(Entities);
        setMenu('landing');
      default:
        break;
    }
  };

  const handleEvent = (event) => {
    const { type } = event;

    switch (type) {
      case 'started':
        setMenu(null);
        break;
      case 'quit':
        engine.current.stop();
        setMenu('summary');
      default:
        break;
    }
  };

  const GameMenu = GameMenus[menu];

  return (
    <SpaceSurveyorsContainer
      ref={resizeRef}
      className="space-surveyors-container"
    >
      {menu && <GameMenu onMenuAction={handleMenuAction}></GameMenu>}
      <StyledGameStage
        ref={engine}
        entities={Entities}
        systems={Systems}
        running={running}
        onEvent={handleEvent}
      ></StyledGameStage>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
