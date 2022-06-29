import React from 'react';
import PropTypes from 'prop-types';
import StyledMenu from '../StyledMenu';
import Button from '@components/Button';

const LandingMenu = ({ onMenuAction }) => {
  const handleGameStart = () => {
    onMenuAction('start');
  };

  return (
    <StyledMenu>
      <h1>Space Surveyors</h1>
      <Button onClick={handleGameStart}>Start</Button>
    </StyledMenu>
  );
};

LandingMenu.propTypes = {
  onMenuAction: PropTypes.func,
};

export default LandingMenu;
