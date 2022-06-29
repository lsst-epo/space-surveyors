import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { containerFull, containerMax, zStack } from '@styles/globalStyle';
import Button from '@components/Button';

const StyledSummary = styled.div`
  background-color: var(--black);
  color: var(--turquoise50);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: ${zStack.menu};
`;

const SummaryContainer = ({ onGameRestart: handleGameRestart }) => {
  return (
    <StyledSummary>
      <h1>Space Surveyors Summary</h1>
      <Button onClick={handleGameRestart}>Restart</Button>
    </StyledSummary>
  );
};

SummaryContainer.propTypes = {
  onGameRestart: PropTypes.func,
};

export default SummaryContainer;
