import React from 'react';
import styled from 'styled-components';
import IconComposer from '@components/svg/IconComposer';
import IconContainer from '@components/svg/helpers/IconContainer';

const ScoreListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  grid-template-rows: auto;
  grid-auto-flow: dense;
  list-style: none;
`;

const ScoreListItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5em;
`;

const Score = styled.div`
  font-variant-numeric: tabular-nums;
  width: 3ch;
`;

const ScoreList = ({ score, className }) => (
  <ScoreListContainer className={className}>
    {Object.keys(score).map((s) => (
      <ScoreListItem key={s}>
        <IconContainer>
          <IconComposer icon={s} color="var(--neutral10)" height="100%" />
        </IconContainer>
        <Score>×{score[s]}</Score>
      </ScoreListItem>
    ))}
  </ScoreListContainer>
);

export default ScoreList;
