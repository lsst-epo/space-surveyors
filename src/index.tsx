import 'regenerator-runtime/runtime.js';
import React from 'react';
import { GameEngine } from 'react-game-engine';
import Entities from '@entities/index';
import Systems from '@systems/index';

class SpaceSurveyors extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>{' '}
        <GameEngine
          entities={Entities}
          systems={Systems}
          style={{
            height: '100vh',
            backgroundColor: 'peachpuff',
            overflow: 'hidden',
          }}
        />
      </div>
    );
  }
}

export { SpaceSurveyors };
