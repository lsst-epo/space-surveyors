import React from 'react';
import { createRoot } from 'react-dom/client';
import { SpaceSurveyors } from 'space-surveyors';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<SpaceSurveyors />);
