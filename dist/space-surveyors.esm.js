import React, { createContext, useContext } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GameEngine } from 'react-game-engine';

var initialStoreContext = {
  state: {
    width: 1,
    height: 1
  },
  dispatch: function dispatch(_a) {}
};

var GlobalStoreContext = /*#__PURE__*/createContext(initialStoreContext);

var Entities = {};

var Systems = [];

var SpaceSurveyors = function SpaceSurveyors() {
  var _useContext = useContext(GlobalStoreContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var _useResizeObserver = useResizeObserver({
    onResize: function onResize(_ref) {
      var width = _ref.width,
          height = _ref.height;
      dispatch({
        type: 'SET_CONTAINER_SIZE',
        width: width,
        height: height
      });
    }
  }),
      ref = _useResizeObserver.ref;

  var width = state.width,
      height = state.height;
  return React.createElement("div", {
    className: "space-surveyors-container",
    ref: ref
  }, React.createElement("h1", null, "Space Surveyors ", width, " ", height), React.createElement(GameEngine, {
    entities: Entities,
    systems: Systems,
    style: {
      height: '100vh',
      backgroundColor: 'peachpuff',
      overflow: 'hidden'
    }
  }));
};

export { SpaceSurveyors };
//# sourceMappingURL=space-surveyors.esm.js.map
