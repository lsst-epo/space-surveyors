import React from 'react';
import BackdropRenderer from '@components/GameplayBackdrop';

const backdrop = {
  isGameplayRunning: true,
  renderer: <BackdropRenderer isGameplayRunning></BackdropRenderer>,
};

export default backdrop;
