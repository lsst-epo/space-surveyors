import React, { useContext } from "react";
import PropTypes from "prop-types";
import useResizeObserver from "use-resize-observer";
import { MENU_TRANSITION_TIME } from "@constants/index";
import { sum } from "@lib/utils";
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
  SummaryLink,
} from "./styles";
import DimensionsContext from "@contexts/dimensions";
import { Trans, useTranslation } from "react-i18next";

const SummaryMenu = ({ onMenuClose, score, engine, isOpen, menu }) => {
  const { t, i18n } = useTranslation();
  const { dimensions } = useContext(DimensionsContext);
  const { aspectRatio } = dimensions;
  const { ref, width } = useResizeObserver();
  const scoreSum = sum(Object.values(score));

  const handleGameRestart = () => {
    engine.current.swap(Entities(aspectRatio));
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
        <SummaryTitle>
          <Trans>menus.summary.title</Trans>
        </SummaryTitle>
        <ScoreSummary $width={width}>
          <Trans
            i18nKey="menus.summary.summary"
            components={[<ScoreStandout>{scoreSum}</ScoreStandout>]}
            values={{ score: scoreSum }}
          ></Trans>
        </ScoreSummary>
        <ScaledScoreList $width={width} {...{ score }} />
        <ButtonContainer>
          <Button onClick={handleGameRestart}>
            <Trans>generics.actions.play_again</Trans>
          </Button>
          <ShareScoreButton score={score} total={scoreSum} />
        </ButtonContainer>
        <ButtonContainer>
          <SummaryLink
            href={t("faq.link")}
            hrefLang={i18n.resolvedLanguage}
            target="_blank"
          >
            <Trans>faq.title</Trans>
          </SummaryLink>
        </ButtonContainer>
      </SummaryMenuResponsive>
    </SummaryMenuWrapper>
  );
};

SummaryMenu.propTypes = {
  score: PropTypes.object,
};

export default SummaryMenu;
