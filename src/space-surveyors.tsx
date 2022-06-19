import React from 'react';
import useResizeObserver from 'use-resize-observer';
import { useGlobalStore } from '@contexts/store';
import { GameEngine } from 'react-game-engine';
import Entities from '@entities/index';
import Systems from '@systems/index';
import styles from './styles.module.css';

const SpaceSurveyors = () => {
  const { state, dispatch } = useGlobalStore();

  const handleContainerResize = ({
    width,
    height,
  }: {
    width: number | undefined;
    height: number | undefined;
  }) => {
    dispatch({ type: 'SET_CONTAINER_SIZE', width, height });
  };

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: handleContainerResize,
  });

  const { width, height } = state;

  return (
    <div className={styles.spaceSurveyorsContainer} ref={ref}>
      <GameEngine
        className={styles.spaceSurveyorsStage}
        entities={Entities}
        systems={Systems}
      >
        <h1>
          Space Surveyors {width} {height}
        </h1>
      </GameEngine>
    </div>
  );
};

export { SpaceSurveyors };
