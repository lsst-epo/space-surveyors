import React from 'react';

import GlobalStyles from '@styles/globalStyle';
import { GlobalStateProvider } from '@contexts/store';
import { SpaceSurveyors } from './space-surveyors';

export default () => (
  <GlobalStateProvider>
    <SpaceSurveyors></SpaceSurveyors>
    <GlobalStyles />
  </GlobalStateProvider>
);
