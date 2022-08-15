import React from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import { BREAK_TABLET_MIN, getRawPx } from '@styles/globalStyle';
import { sum } from '../../utils';
import ScoreList from '@components/ScoreList';

const MobileResponsive = `
gap: 0;
grid-template-columns: 1fr;
padding: 0.5em 1em;`;
const Desktop = `
gap: 2em;
grid-template-columns: 1fr auto;
padding: 1em 2em;`;

const HUDScoreContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  width: 100%;
  height: 100%;
  color: var(--yellow);
  font-weight: bold;

  ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? Desktop : MobileResponsive};
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
  width: 2ch;
  width: 2ch;
  margin-left: 0.5ch;
`;

const Score = styled.div`
  margin-left: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? '1ch' : '0'};
  font-variant-numeric: tabular-nums;
`;

const HUDScore = ({ score }) => {
  const { ref, width, height } = useResizeObserver();

  const scoreSum = sum(Object.values(score));

  return (
    <HUDScoreContainer ref={ref} width={width}>
      <TotalScore width={width}>
        Discovered objects tonight <TotalScoreCount>{scoreSum}</TotalScoreCount>
      </TotalScore>
      <ScoreList {...{ score }} />
    </HUDScoreContainer>
  );
};

HUDScore.propTypes = {
  score: PropTypes.object,
};

export default HUDScore;
