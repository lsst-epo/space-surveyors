import React, { useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useSelector, useDispatch } from 'react-redux';
import { resize } from '@contexts/dimensionsSlice';
import { setStage } from '@contexts/stageSlice';
import SpaceSurveyorsContainer from '@components/SpaceSurveyorsContainer';
import StyledGameStage from '@components/GameStage';
import LandingContainer from '@components/Landing';
import SummaryContainer from '@components/Summary';
import styled from 'styled-components';
import Entities from '@entities/index';
import Systems from '@systems/index';

const SpaceSurveyors = () => {
  const dispatch = useDispatch();
  const engine = useRef();
  const running = false;

  const { ref: resizeRef } = useResizeObserver({
    onResize: (size) => {
      dispatch(resize(size));
    },
  });

  const handleGameStart = () => {
    dispatch(setStage('gameplay'));
    engine.current.start();
  };

  const handleGameRestart = () => {};

  const stage = useSelector((state) => state.stage);
  const isLandingStage = stage === 'landing';
  const isSummaryStage = stage === 'summary';

  return (
    <SpaceSurveyorsContainer
      ref={resizeRef}
      className="space-surveyors-container"
    >
      {isLandingStage && (
        <LandingContainer onGameStart={handleGameStart}></LandingContainer>
      )}
      {isSummaryStage && (
        <SummaryContainer onGameRestart={handleGameRestart}></SummaryContainer>
      )}
      <StyledGameStage
        ref={engine}
        entities={Entities}
        systems={Systems}
        running={running}
      ></StyledGameStage>
    </SpaceSurveyorsContainer>
  );
};

export { SpaceSurveyors };
