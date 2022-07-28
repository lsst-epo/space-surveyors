import React from 'react';
import BackdropRenderer from '@components/Backdrop';

export default () => {
  const showEndgame = false;
  const showSunrise = false;

  return {
    showEndgame,
    showSunrise,
    renderer: <BackdropRenderer showEndgame showSunrise></BackdropRenderer>,
  };
};
