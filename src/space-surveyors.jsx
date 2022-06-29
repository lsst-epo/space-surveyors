import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import StyledGameStage from '@components/GameStage';
import Menus from '@components/Menus';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const [menu, setMenu] = useState('landing');
  const engine = useRef();
  const running = false;

  const { ref: resizeRef } = useResizeObserver({
    onResize: (size) => {
      console.log('resize');
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

  const Menu = Menus[menu];

  return (
    <SpaceSurveyorsContainer
      ref={resizeRef}
      className="space-surveyors-container"
    >
      {menu && <Menu onMenuAction={handleMenuAction}></Menu>}
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
