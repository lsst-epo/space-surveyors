import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { containerFull, containerMax, zStack } from '@styles/globalStyle';
import Button from '@components/Button';

const StyledLanding = styled.div`
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

const LandingContainer = ({ onGameStart: handleGameStart }) => {
  return (
    <StyledLanding>
      <h1>Space Surveyors</h1>
      <Button onClick={handleGameStart}>Start</Button>
    </StyledLanding>
  );
};

LandingContainer.propTypes = {
  onGameStart: PropTypes.func,
};

export default LandingContainer;
