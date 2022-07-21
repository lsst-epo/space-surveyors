import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseMenu from '@components/Menus/BaseMenu';
import Button from '@components/Button';
import { MENU_TRANSITION_TIME } from '@constants/index';
import ScoreList from '@components/ScoreList';

const SummaryMenuContainer = styled(BaseMenu)`
  background-color: var(--neutral95);
  justify-content: center;
  color: var(--yellow);

  & > * + * {
    margin-top: 2em;
  }
`;

const SummaryTitle = styled.h1`
  font-size: 3em;
  text-transform: uppercase;
`;

const ScoreSummary = styled.div`
  display: flex;
  align-items: center;
  font-size: 2em;
  line-height: 1;
  font-weight: bold;
`;

const ScoreStandout = styled.span`
  font-size: 3em;
  margin: 0 0.5ch;
`;

const ScaledScoreList = styled(ScoreList)`
  font-size: 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const LinkContainer = styled(ButtonContainer)`
  color: var(--offWhite);
`;

const SummaryMenu = ({ onMenuAction, score }) => {
  const [showMenu, setMenu] = useState(false);
  const sum = Object.values(score).reduce(
    (accumulator, value) => accumulator + value,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => setMenu(true), MENU_TRANSITION_TIME);
  }, []);

  const handleGameRestart = () => {
    onMenuAction('restart');
  };
  return (
    <SummaryMenuContainer {...{ showMenu }}>
      <SummaryTitle>Congratulations!</SummaryTitle>
      <ScoreSummary>
        You discovered <ScoreStandout>{sum}</ScoreStandout> new objects!
      </ScoreSummary>
      <ScaledScoreList {...{ score }} />
      <ButtonContainer>
        <Button onClick={handleGameRestart}>Play again!</Button>
        {/* <Button onClick={handleGameRestart}>Share my score!</Button> */}
      </ButtonContainer>
      {/* <LinkContainer>
        <a>Explore the night sky on the Skyviewer</a>
        <a>Visit the Solar System on the Orbit Viewer</a>
      </LinkContainer> */}
    </SummaryMenuContainer>
  );
};

SummaryMenu.propTypes = {
  onMenuAction: PropTypes.func,
  score: PropTypes.object,
};

export default SummaryMenu;
