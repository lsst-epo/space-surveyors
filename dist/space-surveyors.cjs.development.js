'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var useResizeObserver = _interopDefault(require('use-resize-observer'));
var reactGameEngine = require('react-game-engine');

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

var GlobalStoreContext = /*#__PURE__*/React.createContext(initialStoreContext);
var Provider = GlobalStoreContext.Provider;

var GlobalStateProvider = function GlobalStateProvider(_ref) {
  var children = _ref.children;

  var _useReducer = React.useReducer(reducer, initialStoreContext.state),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React__default.createElement(Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};

var useGlobalStore = function useGlobalStore() {
  return React.useContext(GlobalStoreContext);
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
  return React__default.createElement("div", {
    className: "space-surveyors-container",
    ref: ref
  }, React__default.createElement("h1", null, "Space Surveyors ", width, " ", height), React__default.createElement(reactGameEngine.GameEngine, {
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
  return React__default.createElement(GlobalStateProvider, null, React__default.createElement(SpaceSurveyors, null));
});

exports.default = index;
//# sourceMappingURL=space-surveyors.cjs.development.js.map
