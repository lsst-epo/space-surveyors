import React from 'react';
import BackdropRenderer from '@components/Backdrop';

export default () => {
  const showEndgame = false;

  return {
    showEndgame,
    renderer: <BackdropRenderer showEndgame></BackdropRenderer>,
  };
};
