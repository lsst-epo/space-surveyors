import React, { useState, useEffect } from "react";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BREAK_TABLET_MIN, getRawPx } from "@styles/globalStyle";
import BaseMenu from "@components/Menus/BaseMenu";
import Button from "@components/Button";
import { MENU_TRANSITION_TIME } from "@constants/index";
import ScoreList from "@components/ScoreList";
import { sum } from "../../../utils";
import ShareScoreButton from "@components/ShareScoreButton";
import MenuWrapper from "../styles";
import Entities from "@entities/index";
import Score from "@entities/score";

const SummaryMenuWrapper = styled(MenuWrapper)`
  justify-content: center;
  color: var(--yellow);
`;

const SummaryMenuResponsive = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 800px;
  max-width: 100%;

  & > * + * {
    margin-top: 2em;
  }
`;

const SummaryTitle = styled.h1`
  font-size: 2.5em;
  text-transform: uppercase;
`;

const ScoreSummary = styled.div`
  display: flex;
  align-items: center;
  ${({ $width }) =>
    $width < getRawPx(BREAK_TABLET_MIN) ? "flex-direction: column" : ""};
  font-size: 2em;
  line-height: 1;
  font-weight: bold;
`;

const ScoreStandout = styled.span`
  font-size: 3em;
  margin: 0 0.5ch;
`;

const ScaledScoreList = styled(ScoreList)`
  grid-template-columns: repeat(auto-fit, minmax(4em, 1fr));
  width: 100%;
  font-size: 2em;

  ${({ $width }) =>
    $width < getRawPx(BREAK_TABLET_MIN)
      ? "& > li {justify-content: center}"
      : ""};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const LinkContainer = styled(ButtonContainer)`
  color: var(--offWhite);
`;

const SummaryMenu = ({
  onMenuClose,
  score,
  engine,
  boundingRect,
  aspectRatio,
}) => {
  const { ref, width } = useResizeObserver();
  const [menuOpen, setMenuOpen] = useState(null);
  const scoreSum = sum(Object.values(score));

  useEffect(() => {
    if (menuOpen === null) {
      const timer = setTimeout(() => setMenuOpen(true), MENU_TRANSITION_TIME);
      return () => clearTimeout(timer);
    }

    if (menuOpen === false) {
      const timer = setTimeout(
        () => onMenuClose("summary"),
        MENU_TRANSITION_TIME
      );
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  const handleGameRestart = () => {
    setMenuOpen(false);
    engine.current.swap(Entities(boundingRect, aspectRatio));
    engine.current.dispatch({ type: "gameStart" });
    engine.current.dispatch({ type: "scoreUpdate", payload: Score() });
  };
  return (
    <SummaryMenuWrapper open={menuOpen} ref={ref}>
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
