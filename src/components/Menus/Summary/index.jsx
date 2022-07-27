import React, { useState, useEffect } from 'react';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BREAK_TABLET_MIN, getRawPx } from '@styles/globalStyle';
import BaseMenu from '@components/Menus/BaseMenu';
import Button from '@components/Button';
import { MENU_TRANSITION_TIME } from '@constants/index';
import ScoreList from '@components/ScoreList';

const SummaryMenuContainer = styled(BaseMenu)`
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
    $width < getRawPx(BREAK_TABLET_MIN) ? 'flex-direction: column' : ''};
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
      ? '& > li {justify-content: center}'
      : ''};
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
  const { ref, width } = useResizeObserver();
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
    <SummaryMenuContainer {...{ showMenu }} ref={ref}>
      <SummaryMenuResponsive>
        <SummaryTitle>Congratulations!</SummaryTitle>
        <ScoreSummary $width={width}>
          You discovered <ScoreStandout>{sum}</ScoreStandout> new objects!
        </ScoreSummary>
        <ScaledScoreList $width={width} {...{ score }} />
        <ButtonContainer>
          <Button onClick={handleGameRestart}>Play again!</Button>
          {/* <Button onClick={handleGameRestart}>Share my score!</Button> */}
        </ButtonContainer>
        {/* <LinkContainer>
        <a>Explore the night sky on the Skyviewer</a>
        <a>Visit the Solar System on the Orbit Viewer</a>
      </LinkContainer> */}
      </SummaryMenuResponsive>
    </SummaryMenuContainer>
  );
};

SummaryMenu.propTypes = {
  onMenuAction: PropTypes.func,
  score: PropTypes.object,
};

export default SummaryMenu;
