import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);
