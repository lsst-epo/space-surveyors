import React from 'react';

import GlobalStyles from '@styles/globalStyle';
import store from '@contexts/store';
import { Provider } from 'react-redux';
import { SpaceSurveyors } from './space-surveyors';

export default () => (
  <Provider store={store}>
    <SpaceSurveyors></SpaceSurveyors>
    <GlobalStyles />
  </Provider>
);
