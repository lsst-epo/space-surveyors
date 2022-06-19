import React, { useContext } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GlobalStoreContext } from '@contexts/store';
import { GameEngine } from 'react-game-engine';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const { state, dispatch } = useContext(GlobalStoreContext);
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width, height }) => {
      dispatch({ type: 'SET_CONTAINER_SIZE', width, height });
    },
  });

  const { width, height } = state;

  return (
    <div className="space-surveyors-container" ref={ref}>
      <h1>
        Space Surveyors {width} {height}
      </h1>
      <GameEngine
        entities={Entities}
        systems={Systems}
        style={{
          height: '100vh',
          backgroundColor: 'peachpuff',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export { SpaceSurveyors };
