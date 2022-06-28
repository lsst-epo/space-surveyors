import React from 'react';

import { GlobalStateProvider } from '@contexts/store';
import { SpaceSurveyors } from './space-surveyors';

export default () => (
  <GlobalStateProvider>
    <SpaceSurveyors></SpaceSurveyors>
  </GlobalStateProvider>
);

