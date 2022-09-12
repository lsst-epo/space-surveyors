import React from "react";
import PropTypes from "prop-types";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components";
import { sum } from "@lib/utils";
import ScoreList from "@components/ScoreList";
import * as Styled from "./styles";
import { Trans } from "react-i18next";

const HUDScore = ({ score }) => {
  const { ref, width, height } = useResizeObserver();

  const scoreSum = sum(Object.values(score));

  return (
    <Styled.HUDScoreContainer ref={ref} width={width}>
      <Styled.TotalScore width={width}>
        <Trans
          i18nKey="menus.hud.score"
          components={[
            <Styled.TotalScoreCount>{scoreSum}</Styled.TotalScoreCount>,
          ]}
          values={{ score: scoreSum }}
        ></Trans>
      </Styled.TotalScore>
      <ScoreList {...{ score }} />
    </Styled.HUDScoreContainer>
  );
};

HUDScore.propTypes = {
  score: PropTypes.object,
};

export default HUDScore;
