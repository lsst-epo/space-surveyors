import React from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import { BREAK_TABLET_MIN, getRawPx } from '@styles/globalStyle';
import ScoreList from '@components/ScoreList';

const HUDScoreContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? '1fr auto' : '1fr'};
  grid-template-rows: auto;
  gap: ${({ width }) => (width > getRawPx(BREAK_TABLET_MIN) ? '2em' : '0')};
  width: 100%;
  height: 100%;
  color: var(--yellow);
  font-weight: bold;
`;

const TotalScore = styled.div`
  display: flex;
  ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? 'justify-content: flex-end;' : ''}
  align-items: center;
  line-height: 1;
  font-size: 2em;
`;

const TotalScoreCount = styled.span`
  font-size: 2em;
  font-variant-numeric: tabular-nums;
  margin-left: 0.5ch;
`;

const Score = styled.div`
  margin-left: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? '1ch' : '0'};
  font-variant-numeric: tabular-nums;
`;

const HUDScore = ({ score }) => {
  const { ref, width, height } = useResizeObserver();

  const values = Object.values(score);

  const sum = values.reduce((accumulator, value) => accumulator + value, 0);

  return (
    <HUDScoreContainer ref={ref} width={width}>
      <TotalScore width={width}>
        Discovered objects tonight <TotalScoreCount>{sum}</TotalScoreCount>
      </TotalScore>
      <ScoreList {...{ score }} />
    </HUDScoreContainer>
  );
};

HUDScore.propTypes = {
  score: PropTypes.object,
};

export default HUDScore;
