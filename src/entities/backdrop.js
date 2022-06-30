import React from 'react';
import BackdropRenderer from '@components/Backdrop';

export default () => {
  const isGameplayRunning = true;

  return {
    isGameplayRunning,
    renderer: <BackdropRenderer isGameplayRunning></BackdropRenderer>,
  };
};
