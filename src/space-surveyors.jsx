import React from 'react';
import useResizeObserver from 'use-resize-observer';
import { useGlobalStore } from '@contexts/store';
import { GameEngine } from 'react-game-engine';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import StyledGameStage from '@components/GameStage';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const { state, dispatch } = useGlobalStore();

  const handleContainerResize = ({ width, height }) => {
    dispatch({ type: 'SET_CONTAINER_SIZE', width, height });
  };

  const { ref } = useResizeObserver({
    onResize: handleContainerResize,
  });

  const { width, height } = state;

  return (
    <SpaceSurveyorsContainer ref={ref} className="space-surveyors-container">
      <StyledGameStage entities={Entities} systems={Systems}>
        <h1>
          Space Surveyors {width} {height}
        </h1>
      </StyledGameStage>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
