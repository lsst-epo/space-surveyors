'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var useResizeObserver = _interopDefault(require('use-resize-observer'));
var reactGameEngine = require('react-game-engine');

var initialStoreContext = {
  state: {
    width: 1,
    height: 1
  },
  dispatch: function dispatch(_a) {}
};

var GlobalStoreContext = /*#__PURE__*/React.createContext(initialStoreContext);

var Entities = {};

var Systems = [];

var SpaceSurveyors = function SpaceSurveyors() {
  var _useContext = React.useContext(GlobalStoreContext),
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

exports.SpaceSurveyors = SpaceSurveyors;
//# sourceMappingURL=space-surveyors.cjs.development.js.map
