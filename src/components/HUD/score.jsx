import React from 'react';
import styled from 'styled-components';
import IconComposer from '@components/svg/IconComposer';
import Icons from '@components/svg/Icons';

const HUDScoreContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--yellow);
  font-weight: bold;
`;

const ScoreList = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const ScoreListItem = styled.li`
  display: flex;
  align-items: center;
  flex-basis: 20%;
  font-size: 1.25em;
  line-height: 1;
`;

const TotalScore = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2em;
  font-size: 2em;
`;

const TotalScoreCount = styled.span`
  font-size: 2em;
  margin-left: 0.5ch;
  font-variant-numeric: tabular-nums;
`;

const Score = styled.span`
  margin-left: 1ch;
  font-variant-numeric: tabular-nums;
`;

const HUDScore = ({ score }) => {
  const values = Object.values(score);

  const sum = values.reduce((accumulator, value) => accumulator + value, 0);

  return (
    <HUDScoreContainer>
      <TotalScore>
        Discovered objects tonight <TotalScoreCount>{sum}</TotalScoreCount>
      </TotalScore>
      <ScoreList>
        {Object.keys(score).map((s) => (
          <ScoreListItem key={s}>
            <IconComposer icon={s} width="1.5em" height="1.5em"></IconComposer>
            <Score>×{score[s]}</Score>
          </ScoreListItem>
        ))}
      </ScoreList>
    </HUDScoreContainer>
  );
};

export default HUDScore;
