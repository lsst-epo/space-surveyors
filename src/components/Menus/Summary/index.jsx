import React from 'react';
import PropTypes from 'prop-types';
import StyledMenu from '../StyledMenu';
import Button from '@components/Button';

const SummaryMenu = ({ onMenuAction }) => {
  const handleGameRestart = () => {
    onMenuAction('restart');
  };
  return (
    <StyledMenu>
      <h1>Space Surveyors Summary</h1>
      <Button onClick={handleGameRestart}>Restart</Button>
    </StyledMenu>
  );
};

SummaryMenu.propTypes = {
  onMenuAction: PropTypes.func,
};

export default SummaryMenu;
