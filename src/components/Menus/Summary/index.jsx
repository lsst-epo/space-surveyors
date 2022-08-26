import React, { useContext } from "react";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MENU_TRANSITION_TIME } from "@constants/index";
import { sum } from "../../../utils";
import Entities from "@entities/index";
import Score from "@entities/score";
import Button from "@components/Button";
import ShareScoreButton from "@components/ShareScoreButton";
import {
  SummaryMenuWrapper,
  SummaryMenuResponsive,
  SummaryTitle,
  ScoreSummary,
  ScoreStandout,
  ScaledScoreList,
  ButtonContainer,
} from "./styles";
import DimensionsContext from "@contexts/dimensions";

const SummaryMenu = ({ onMenuClose, score, engine, isOpen, menu }) => {
  const { dimensions } = useContext(DimensionsContext);
  const { aspectRatio } = dimensions;
  const { ref, width } = useResizeObserver();
  const scoreSum = sum(Object.values(score));

  const handleGameRestart = () => {
    engine.current.swap(Entities(boundingRect, aspectRatio));
    onMenuClose(menu);

    const timer = setTimeout(() => {
      engine.current.dispatch({ type: "gameStart" });
      engine.current.dispatch({ type: "scoreUpdate", payload: Score() });
    }, MENU_TRANSITION_TIME);
    return () => clearTimeout(timer);
  };
  return (
    <SummaryMenuWrapper open={isOpen} ref={ref}>
      <SummaryMenuResponsive>
        <SummaryTitle>Congratulations!</SummaryTitle>
        <ScoreSummary $width={width}>
          You discovered <ScoreStandout>{scoreSum}</ScoreStandout> new objects!
        </ScoreSummary>
        <ScaledScoreList $width={width} {...{ score }} />
        <ButtonContainer>
          <Button onClick={handleGameRestart}>Play again!</Button>
          <ShareScoreButton score={score} total={scoreSum} />
        </ButtonContainer>
        {/* <LinkContainer>
        <a>Explore the night sky on the Skyviewer</a>
        <a>Visit the Solar System on the Orbit Viewer</a>
      </LinkContainer> */}
      </SummaryMenuResponsive>
    </SummaryMenuWrapper>
  );
};

SummaryMenu.propTypes = {
  score: PropTypes.object,
};

export default SummaryMenu;
