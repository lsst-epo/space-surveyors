import React from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import IconComposer from '@components/svg/IconComposer';
import Icons from '@components/svg/Icons';
import { BREAK_TABLET_MIN, getRawPx } from '@styles/globalStyle';

const HUDScoreContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? '3fr 1fr' : '1fr'};
  gap: ${({ width }) => (width > getRawPx(BREAK_TABLET_MIN) ? '2em' : '0')};
  width: 100%;
  height: 100%;
  color: var(--yellow);
  font-weight: bold;
`;

const ScoreList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: ${({ width }) =>
    width > getRawPx(BREAK_TABLET_MIN) ? 'column' : 'row'};
`;

const ScoreListItem = styled.li`
  display: flex;
  flex: 0 0 20%;
  align-items: center;
  font-size: 1.25em;
  line-height: 1;
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

const IconContainer = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  aspect-ratio: 1/1;
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
      <ScoreList {...{ width, height }}>
        {Object.keys(score).map((s) => (
          <ScoreListItem key={s}>
            <IconContainer>
              <IconComposer icon={s} color="var(--neutral10)" height="100%" />
            </IconContainer>
            <Score width={width}>×{score[s]}</Score>
          </ScoreListItem>
        ))}
      </ScoreList>
    </HUDScoreContainer>
  );
};

HUDScore.propTypes = {
  score: PropTypes.object,
};

export default HUDScore;
