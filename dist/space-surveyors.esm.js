import React, { useReducer, useContext, createContext } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GameEngine } from 'react-game-engine';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var initialStoreContext = {
  state: {
    width: undefined,
    height: undefined
  },
  dispatch: function dispatch(_a) {}
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTAINER_SIZE':
      var width = action.width,
          height = action.height;
      return _extends({}, state, {
        width: width,
        height: height
      });

    default:
      return state;
  }
};

var GlobalStoreContext = /*#__PURE__*/createContext(initialStoreContext);
var Provider = GlobalStoreContext.Provider;

var GlobalStateProvider = function GlobalStateProvider(_ref) {
  var children = _ref.children;

  var _useReducer = useReducer(reducer, initialStoreContext.state),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React.createElement(Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};

var useGlobalStore = function useGlobalStore() {
  return useContext(GlobalStoreContext);
};

var Entities = {};

var Systems = [];

var SpaceSurveyors = function SpaceSurveyors() {
  var _useGlobalStore = useGlobalStore(),
      state = _useGlobalStore.state,
      dispatch = _useGlobalStore.dispatch;

  var handleContainerResize = function handleContainerResize(_ref) {
    var width = _ref.width,
        height = _ref.height;
    dispatch({
      type: 'SET_CONTAINER_SIZE',
      width: width,
      height: height
    });
  };

  var _useResizeObserver = useResizeObserver({
    onResize: handleContainerResize
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

var index = (function () {
  return React.createElement(GlobalStateProvider, null, React.createElement(SpaceSurveyors, null));
});

export default index;
//# sourceMappingURL=space-surveyors.esm.js.map
